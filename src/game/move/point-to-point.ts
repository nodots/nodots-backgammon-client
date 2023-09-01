import { produce } from 'immer'
import { Color, GameError, isColor } from '../game'
import { MoveMode } from '../../components/Board/state'
import { Board } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates, hit } from '.'
import { Rail, isRail } from '../../components/Rail/state/types'
import { Point } from '../../components/Point/state/types'

export const pointToPoint = (board: Board, move: Move): Board => {
  let checkerToMove: Checker | undefined = undefined
  let hitChecker: Checker | undefined = undefined
  let newOpponentRail: Rail | undefined = undefined
  let finalDestination: CheckerBox | undefined = undefined

  if (!isCheckerBox(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin'
    })
  }
  if (!isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing destination'
    })
  }

  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
  const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
  let newDestination = produce(oldDestination, draft => {
    if (isChecker(checkerToMove)) {
      draft.checkers.push(checkerToMove)
    } else {
      throw new Error('No checker to move')
    }
  })

  if (move.mode === MoveMode.POINT_TO_POINT_HIT) {
    hitChecker = oldDestination.checkers[0]
    if (!isChecker(hitChecker)) {
      throw Error('No hitChecker')
    } else {
      newOpponentRail = hit(board.rail[hitChecker.color], hitChecker)
    }
    finalDestination = produce(oldDestination, draft => {
      if (isChecker(checkerToMove)) {
        draft.checkers[0] = checkerToMove
      }
    })
  }

  return produce(board, draft => {
    draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
    draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = finalDestination as Point || newDestination as Point
    if (newOpponentRail) {
      const opponentColor = newOpponentRail.color
      draft.rail[opponentColor] = newOpponentRail
    }
  })
}

import { produce } from 'immer'
import { Color, GameError, isColor } from '../game'
import { MoveMode } from '../../components/Board/state'
import { Board } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates, hit } from '.'
import { Rail } from '../../components/Rail/state/types'

export const pointToPoint = (board: Board, move: Move): Board => {
  if (!move.origin || !move.destination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }


  return produce(board, draft => {
    let checkerToMove: Checker | undefined = undefined
    let hitChecker: Checker | undefined = undefined
    let newRail: Rail | undefined = undefined

    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }

    const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
    console.log('[TRACE] point-to-point  destinationInfo:', destinationInfo)
    console.log('[TRACE] point-to-point  move.origin:', move.origin)
    console.log('[TRACE] point-to-point move.destination:', move.destination)
    const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
    console.log('[TRACE] point-to-point oldDestination:', oldDestination)


    const originInfo = getCheckerboxCoordinates(board, move.origin.id)
    const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
    console.log('[TRACE] point-to-point oldOrigin:', oldOrigin)
    const newOrigin = produce(oldOrigin, draft => {
      draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
    })
    const newDestination = produce(oldDestination, draft => {
      if (!oldOrigin.checkers[oldOrigin.checkers.length - 1]) {
        throw Error('No checkerToMove')
      }
      checkerToMove = oldOrigin.checkers[oldOrigin.checkers.length - 1]
      if (move.mode === MoveMode.POINT_TO_POINT_HIT) {
        hitChecker = oldDestination.checkers[0]
        if (!isChecker(hitChecker)) {
          throw Error('No hitChecker')
        } else {
          const oldRail = board.rail[hitChecker.color]
          newRail = hit(board.rail[hitChecker.color], hitChecker)
        }
        draft.checkers[0] = checkerToMove
      } else {
        draft.checkers.push(checkerToMove)
      }
    })

    return produce(board, draft => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
      if (move.mode === MoveMode.POINT_TO_POINT_HIT) {
        if (!isCheckerBox(newRail)) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'Missing newRail for POINT_TO_POINT_HIT'
          })
        }
        if (newRail.checkers.length === 0) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'Missing newRail for POINT_TO_POINT_HIT'
          })
        }
        if (isChecker(hitChecker)) {
          draft.rail[hitChecker.color] = newRail
        }
      }
    })
  })
}

import { produce } from 'immer'
import { GameError } from '../game'
import { getCheckerBoxes } from '../../components/Board/state'
import { Board } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, MoveStatus, getCheckerboxCoordinates, hit } from '.'
import { Rail } from '../../components/Rail/state/types'
import { Point } from '../../components/Point/state/types'
import { MoveResult } from './reducer'

export const pointToPoint = (board: Board, move: Move): MoveResult => {
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isCheckerBox(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin'
    })
  }

  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  const destinationPosition =
    move.direction === 'clockwise'
      ? newOrigin.position + move.dieValue
      : newOrigin.position - move.dieValue
  console.warn('destinationPosition', destinationPosition)
  const destinationPoint = getCheckerBoxes(board).find(cb => typeof cb.position === 'number' && cb.position === destinationPosition)
  if (isCheckerBox(destinationPoint)) {
    console.warn('destinationPoint', destinationPoint)
    let newDestination = produce(destinationPoint, draft => {
      if (isChecker(checkerToMove)) {
        draft.checkers.push(checkerToMove)
      }
    })
    console.warn('newDestination', newDestination)
    const destinationInfo = getCheckerboxCoordinates(board, destinationPoint.id)
    let newBoard = produce(board, draft => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination as Point
    })

    let newMove = produce(move, draft => {
      draft.destination = newDestination
      draft.status = MoveStatus.COMPLETED
    })

    moveResult.board = newBoard
    moveResult.move = newMove
  }

  return moveResult
}

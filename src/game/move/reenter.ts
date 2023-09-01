import { produce } from 'immer'
import { GameError } from '../game'
import { Checker, isChecker } from '../../components/Checker/state'
import { Board } from '../../components/Board/state'
import { isRail } from '../../components/Rail/state/types'
import { Move, MoveStatus, getCheckerboxCoordinates } from '.'
import { isPoint } from '../../components/Point/state/types'
import { MoveResult } from './reducer'
import { QuadrantLocation, isQuadrant } from '../../components/Quadrant/state'
import { isCheckerBox } from '../../components/CheckerBox/state'

export const reenter = (board: Board, move: Move): MoveResult => {
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isRail(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing rail'
    })

  }

  const oldRail = board.rail[move.origin.color]
  const newRail = produce(oldRail, draft => {
    draft.checkers.splice(oldRail.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]

  const targetQuadrant =
    move.direction === 'clockwise'
      ? board.quadrants.find(q => q.location === QuadrantLocation.SE)
      : board.quadrants.find(q => q.location === QuadrantLocation.NE)

  if (isQuadrant(targetQuadrant)) {
    const targetPointPosition = move.direction === 'clockwise'
      ? move.dieValue
      : 24 - move.dieValue + 1

    const destinationPoint = targetQuadrant.points.find(p => p.position === targetPointPosition)
    if (isCheckerBox(destinationPoint)) {
      let newDestination = produce(destinationPoint, draft => {
        if (isChecker(checkerToMove)) {
          draft.checkers.push(checkerToMove)
        }
      })
      console.warn('newDestination', newDestination)
      const destinationInfo = getCheckerboxCoordinates(board, destinationPoint.id)

      let newBoard = produce(board, draft => {
        if (isChecker(checkerToMove)) {
          draft.rail[checkerToMove.color] = newRail
          draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
        }
      })

      let newMove = produce(move, draft => {
        draft.destination = newDestination
        draft.status = MoveStatus.COMPLETED
      })
      moveResult.board = newBoard
      moveResult.move = newMove
    }

    return moveResult
  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing targetQuadrant'
    })
  }
}
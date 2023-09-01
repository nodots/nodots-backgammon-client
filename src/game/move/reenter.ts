import { GameError } from '../game'
import { Checker } from '../../components/Checker/state'
import { Board } from '../../components/Board/state'
import { Rail } from '../../components/Rail/state/types'
import { Move, MoveStatus, getCheckerboxCoordinates } from '.'
import { isChecker } from '../../components/Checker/state'
import { isPoint } from '../../components/Point/state/types'
import { MoveResult } from './reducer'
import { QuadrantLocation, isQuadrant } from '../../components/Quadrant/state'

export const reenter = (board: Board, move: Move): MoveResult => {
  let moveResult = { board: board, move }
  let checkerToMove: Checker | undefined = undefined

  if (move.origin?.checkers && move.origin?.checkers.length > 0) {
    checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  }

  const targetQuadrant =
    move.direction === 'clockwise'
      ? board.quadrants.find(q => q.location === QuadrantLocation.SE)
      : board.quadrants.find(q => q.location === QuadrantLocation.NE)

  if (isQuadrant(targetQuadrant)) {
    const targetPointPosition = move.direction === 'clockwise'
      ? move.dieValue
      : 24 - move.dieValue + 1

    const targetPoint = targetQuadrant.points.find(p => p.position === targetPointPosition)
    if (isPoint(targetPoint)) {
      if (targetPoint.checkers.length === 0) {
        if (move.origin) {
          // const newOrigin = produce(move.origin, originDraft => {
          //   originDraft.checkers.splice(originDraft.checkers.length - 1, 1)
          // })
          // const destinationInfo = getCheckerboxCoordinates(board, targetPoint.id)
          // const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
          // const newDestination = produce(oldDestination, oldDestinationDraft => {
          //   if (isChecker(checkerToMove)) {
          //     oldDestinationDraft.checkers.push(checkerToMove)
          //   } else {
          //     throw new GameError({
          //       model: 'Move',
          //       errorMessage: 'No checkerToMove'
          //     })
          //   }
          // })

          // const newBoard: Board = produce(board, draft => {
          //   if (isChecker(checkerToMove)) {
          //     // FIXME
          //     draft.rail[checkerToMove.color] = newOrigin as Rail
          //     draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
          //   } else {
          //     throw new GameError({
          //       model: 'Move',
          //       errorMessage: 'No checkerToMove'
          //     })
          //   }
          // })

          // const newMove = produce(move, draft => {
          //   draft.destination = newDestination
          //   draft.status = MoveStatus.COMPLETED
          // })

          // return produce(moveResult, draft => {
          //   draft.board = newBoard
          //   draft.move = newMove
          // })
        } else {
          throw new GameError({
            model: 'Move',
            errorMessage: 'No move.origin'
          })
        }
      } else {
        throw new Error('More than one checker')
      }
    } else {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No targetPoint'
      })

    }
  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No targetQuadrant'
    })
  }

  return moveResult
}

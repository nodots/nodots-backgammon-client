import { produce } from 'immer'
import { Board } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { Move, MoveStatus } from '.'
import { Bar } from '../../components/Bar/state/types'
import { Point, isPoint } from '../../components/Point/state/types'
import { MoveResult } from './reducer'
import { getCheckerboxCoordinates } from '../../components/Board/state'

export const revert = (board: Board, move: Move): MoveResult => {
  let moveResult = { board, move }

  let checkerToMove: Checker
  let origin: Point
  let newOrigin: Point
  let destination: Point
  let newDestination: Point
  let finalMove: Move
  let finalBoard: Board

  if (
    move.destination &&
    isPoint(move.destination) &&
    move.origin &&
    isPoint(move.origin) &&
    isChecker(move.checker)
  ) {
    origin = move.destination
    destination = move.origin
    checkerToMove = move.checker

    const newOriginCheckers = origin.checkers.filter(
      (c) => c.id !== checkerToMove.id
    )
    newOrigin = produce(origin, (draft) => {
      draft.checkers = newOriginCheckers
    })
    newDestination = produce(destination, (draft) => {
      draft.checkers.push(checkerToMove)
    })

    finalMove = produce(move, (draft) => {
      draft.origin = undefined
      draft.destination = undefined
      draft.checker = undefined
      draft.status = MoveStatus.INITIALIZED
    })

    const originInfo = getCheckerboxCoordinates(board, origin.id)
    const destinationInfo = getCheckerboxCoordinates(board, destination.id)

    finalBoard = produce(board, (draft) => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] =
        newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[
        destinationInfo.pointIndex
      ] = newDestination
    })

    moveResult.move = finalMove
    moveResult.board = finalBoard

    return moveResult
  }

  return moveResult
}

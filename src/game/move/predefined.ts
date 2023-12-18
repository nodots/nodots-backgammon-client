import { produce } from 'immer'
import { GameError } from '../game'
import {
  Board,
  getCheckerboxes,
  getCheckerboxCoordinates,
} from '../../components/Board/state/types'
import { Checker, isChecker } from '../../components/Checker/state/types'
import { Move, MoveStatus, hit } from '.'
import { Bar } from '../../components/Bar/state/types'
import { Point, isPoint } from '../../components/Point/state/types'
import { MoveResult, getNextPointPosition } from './reducer'

export const predefined = (board: Board, move: Move): MoveResult => {
  let checkerToMove: Checker
  let hitChecker: Checker
  let newOrigin: Point
  let newDestination: Point
  let opponentRail: Bar
  let newOpponentRail: Bar
  let finalMove: Move
  let finalBoard: Board

  let moveResult = { board, move }

  if (!isPoint(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin',
    })
  }

  newOrigin = produce(move.origin, (draft) => {
    if (move.origin && move.origin.checkers) {
      draft.checkers.splice(move.origin.checkers.length - 1, 1)
    } else {
      throw Error('No origin')
    }
  })
  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]

  const destinationPosition = getNextPointPosition(
    newOrigin.position,
    move.dieValue,
    move.direction
  )
  const destination = getCheckerboxes(board).find(
    (cb) =>
      typeof cb.position === 'number' && cb.position === destinationPosition
  )

  if (isPoint(destination)) {
    if (
      destination.checkers.length === 0 ||
      (destination.checkers.length >= 1 &&
        isChecker(checkerToMove) &&
        destination.checkers.filter((c) => c.color !== checkerToMove?.color)
          .length === 0)
    ) {
      // FIXME: this is a massive hack to fix a problem with reverting moves.
      const dupeChecker = destination.checkers.find(
        (c) => c.id === checkerToMove.id
      )

      newDestination = produce(destination, (draft) => {
        if (isChecker(checkerToMove) && !isChecker(dupeChecker)) {
          draft.checkers.push(checkerToMove)
        }
      })

      finalMove = produce(move, (draft) => {
        draft.checker = checkerToMove
        draft.origin = newOrigin
        draft.destination = newDestination
        draft.status = MoveStatus.COMPLETED
      })

      const originInfo = getCheckerboxCoordinates(board, move.origin.id)
      const destinationInfo = getCheckerboxCoordinates(board, newDestination.id)

      finalBoard = produce(board, (draft) => {
        draft.quadrants[originInfo.quadrantIndex].points[
          originInfo.pointIndex
        ] = newOrigin
        draft.quadrants[destinationInfo.quadrantIndex].points[
          destinationInfo.pointIndex
        ] = newDestination
      })

      moveResult.move = finalMove
      moveResult.board = finalBoard
      // Hit
    } else if (
      destination.checkers.length === 1 &&
      destination.checkers[0].color !== checkerToMove.color
    ) {
      hitChecker = destination.checkers[0]
      opponentRail = board.bar[hitChecker.color]

      newOpponentRail = produce(opponentRail, (draft) => {
        draft.checkers.push(hitChecker)
      })

      newDestination = produce(destination, (draft) => {
        draft.checkers = destination.checkers.filter(
          (c) => c.id !== hitChecker.id
        )
        draft.checkers.push(checkerToMove)
      })

      finalMove = produce(move, (draft) => {
        draft.origin = newOrigin
        draft.destination = newDestination
        draft.status = MoveStatus.COMPLETED
        draft.hit = {
          checker: hitChecker,
          checkerbox: newDestination,
        }
      })

      const originInfo = getCheckerboxCoordinates(board, move.origin.id)
      const destinationInfo = getCheckerboxCoordinates(board, newDestination.id)

      finalBoard = produce(board, (draft) => {
        draft.quadrants[originInfo.quadrantIndex].points[
          originInfo.pointIndex
        ] = newOrigin
        draft.quadrants[destinationInfo.quadrantIndex].points[
          destinationInfo.pointIndex
        ] = newDestination
        draft.bar[hitChecker.color] = newOpponentRail
      })

      moveResult.move = finalMove
      moveResult.board = finalBoard
    }
  }

  return moveResult
}

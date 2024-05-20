import { MoveCompleted, MoveMoved, MoveMoving, NodotsMovePayload } from '.'
import { Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'

export const pointToPoint = (
  payload: NodotsMovePayload
): MoveMoving | MoveMoved | MoveCompleted => {
  const { state, checker, origin, destination, move } = payload
  const { board, player } = state

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (originChecker) => originChecker.id !== checker.id
  ))

  const destinationCheckers = [...destination.checkers, checker]

  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point
  updatedDestination.checkers = destinationCheckers

  move.from = updatedOrigin
  move.to = updatedDestination

  return {
    ...state,
    kind: 'move-moved',
    player: player as MovingPlayer,
    move: move,
    checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
  }
}

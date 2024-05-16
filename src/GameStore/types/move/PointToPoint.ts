import { Completed, Moved, Moving, NodotsMovePayload, isBearOffing } from '.'
import { Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'
import { bearOff } from './BearOff'

export const pointToPoint = (
  payload: NodotsMovePayload
): Moving | Moved | Completed => {
  const { state, checker, origin, destination, move } = payload
  const { board, player } = state

  const point = origin as Point

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (originChecker) => originChecker.id !== checker.id
  ))

  if (isBearOffing(board, player)) {
    return bearOff(state, checker, move, point, destination)
  }

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
    kind: 'move',
    player: player as MovingPlayer,
    move: move,
    checker: checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
  }
}

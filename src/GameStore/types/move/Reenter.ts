import { MoveMoved, NodotsMovePayload } from '.'
import { Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'

export const reenter = (payload: NodotsMovePayload): MoveMoved => {
  const { state, destination, origin, checker, move: activeMove } = payload
  const { board, player } = state

  const reenteringPlayer = player as MovingPlayer

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (originChecker) => originChecker.id !== checker.id
  ))

  const destinationCheckers = [...destination.checkers, checker]

  const updatedOrigin = board.bar[checker.color]
  updatedOrigin.checkers = originCheckers

  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point // FIXME
  updatedDestination.checkers = destinationCheckers

  activeMove.from = updatedOrigin
  activeMove.to = updatedDestination

  return {
    ...state,
    kind: 'move-moved',
    move: activeMove,
    checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
    player: reenteringPlayer,
  }
}

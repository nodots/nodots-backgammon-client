import { Moved, NodotsMovePayload } from '.'
import { Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'

export const reenter = (payload: NodotsMovePayload): Moved => {
  const { state, destination, origin, checker, move: activeMove } = payload
  const { board, player } = state
  console.log(origin.kind)
  console.log(origin.checkers)

  const reenteringPlayer = player as MovingPlayer
  console.log(reenteringPlayer.color)

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checker.id
  ))
  console.log(originCheckers)

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
    kind: 'moved',
    move: activeMove,
    checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
    player: reenteringPlayer,
  }
}

import { MoveCompleted, MoveMoved, MoveMoving, NodotsMovePayload } from '.'
import { CHECKERS_PER_PLAYER } from '..'
import { Point } from '../Checkercontainer'
import { MovingPlayer, WinningPlayer } from '../Player'

export const bearOff = (
  payload: NodotsMovePayload
): MoveMoved | MoveMoving | MoveCompleted => {
  const { state, checker, origin, destination, move, moves, players } = payload
  const { board, player } = state
  if (!move) {
    throw Error('No activeMove')
  }
  const originCheckers = origin.checkers.filter((c) => c.id !== checker.id)
  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const destinationCheckers = destination.checkers.concat(checker)
  const updatedDestination = board.off[player.color]
  updatedDestination.checkers = destinationCheckers

  move.from = updatedOrigin
  move.to = updatedDestination

  return {
    kind: 'move-moved',
    move,
    // FIXME: Again, TS compiler is insisting there must be 4 moves in the array.
    //@ts-ignore
    moves,
    checker,
    board,
    player: player as MovingPlayer,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

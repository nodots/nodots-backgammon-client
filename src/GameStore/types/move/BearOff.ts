import {
  MoveCompleted,
  MoveMoved,
  MoveMoving,
  NodotsMove,
  NodotsMovePayload,
  NodotsMoveState,
} from '.'
import { CHECKERS_PER_PLAYER } from '..'
import { Point } from '../Checkercontainer'
import { MovingPlayer, WinningPlayer } from '../Player'

export const bearOff = (
  payload: NodotsMovePayload
): MoveMoved | MoveMoving | MoveCompleted => {
  console.log('BEAR OFF')
  const { state, checker, origin, destination, move, moves, players } = payload
  const { board, player } = state
  if (!move) {
    throw Error('No activeMove')
  }
  const originCheckers = origin.checkers.filter((c) => c.id !== checker.id)

  const destinationCheckers = destination.checkers.concat(checker)

  // TODO: Move to to game store
  if (destinationCheckers.length === CHECKERS_PER_PLAYER) {
    return {
      ...state,
      kind: 'move-completed',
      winner: player as unknown as WinningPlayer, // FIXME
    }
  }

  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

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

import {
  MoveCompleted,
  MoveMoved,
  MoveMoving,
  NodotsMove,
  NodotsMoveState,
} from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Point } from '../Checkercontainer'
import { CHECKERS_PER_PLAYER } from '..'
import { MovingPlayer, WinningPlayer } from '../Player'

// If there is no checker on the point indicated by the roll, the player must make a legal move using a checker on a
//    higher-numbered point. If there are no checkers on higher-numbered points, the player is permitted (and required) to remove a checker from the highest point on which one of his checkers resides. A player is under no obligation to bear off if he can make an otherwise legal move.

export const bearOff = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point,
  destination: Checkercontainer
): MoveMoved | MoveMoving | MoveCompleted => {
  const { board, player, moves } = state
  if (!activeMove) {
    throw Error('No activeMove')
  }
  const originCheckers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  )

  const destinationCheckers = destination.checkers.concat(checkerToMove)

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

  activeMove.from = updatedOrigin
  activeMove.to = updatedDestination

  return {
    kind: 'move-moved',
    move: activeMove,
    checker: checkerToMove,
    board,
    player: player as MovingPlayer,
    moves,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

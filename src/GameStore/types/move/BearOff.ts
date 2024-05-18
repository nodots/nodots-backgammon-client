import { Completed, Moved, Moving, NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Point } from '../Checkercontainer'
import { CHECKERS_PER_PLAYER } from '..'
import { MovingPlayer, Player, WinningPlayer } from '../Player'
import { NodotsBoardStore } from '../Board'

// Once a player has moved all of his fifteen checkers into his home board, he may commence bearing off.
export const isBearOffing = (
  board: NodotsBoardStore,
  player: Player
): boolean => {
  const homeBoardPoints = board.points.filter(
    (point) => point.position[player.direction] <= 6
  )
  const homeBoardCheckerCount = homeBoardPoints
    .map((point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
        ? point.checkers.length
        : 0
    )
    .reduce((a, b) => a + b, 0)

  const offCheckerCount = board.off[player.color].checkers.length
  const checkerCount = homeBoardCheckerCount + offCheckerCount
  // -1 because the checker that is in play isn't counted?
  return checkerCount === CHECKERS_PER_PLAYER - 1 ? true : false
}

// If there is no checker on the point indicated by the roll, the player must make a legal move using a checker on a
//    higher-numbered point. If there are no checkers on higher-numbered points, the player is permitted (and required) to remove a checker from the highest point on which one of his checkers resides. A player is under no obligation to bear off if he can make an otherwise legal move.

export const bearOff = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point,
  destination: Checkercontainer
): Moved | Moving | Completed => {
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
      kind: 'completed',
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
    kind: 'moved',
    move: activeMove,
    checker: checkerToMove,
    board,
    player: player as MovingPlayer,
    moves,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

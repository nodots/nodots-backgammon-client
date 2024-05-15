import { Completed, Moved, Moving, NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Point } from '../Checkercontainer'
import { CHECKERS_PER_PLAYER } from '..'
import { MovingPlayer, WinningPlayer } from '../Player'

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
      winner: player as WinningPlayer,
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
    activeMove,
    checkerToMove,
    board,
    player: player as MovingPlayer,
    moves,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

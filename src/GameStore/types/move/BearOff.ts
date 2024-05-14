import checker from 'vite-plugin-checker'
import { Completed, Moved, Moving, NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Off, Point } from '../Checkercontainer'
import { CHECKERS_PER_PLAYER } from '..'
import { WinningPlayer } from '../Player'

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

  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const updatedDestination = board.off[checkerToMove.color]
  updatedDestination.checkers = destinationCheckers

  activeMove.from = updatedOrigin
  activeMove.to = updatedDestination

  let winningPlayer: WinningPlayer | undefined = undefined
  if (board.off[player.color].checkers.length === CHECKERS_PER_PLAYER) {
    winningPlayer = player as WinningPlayer
  }

  return {
    kind: winningPlayer ? 'completed' : 'moved',
    activeMove,
    checkerToMove,
    board,
    player: winningPlayer ? winningPlayer : player,
    moves,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

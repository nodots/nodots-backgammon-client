import checker from 'vite-plugin-checker'
import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Off, Point } from '../Checkercontainer'

export const bearOff = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point,
  destination: Checkercontainer
): NodotsMoveState => {
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

  return {
    kind: 'move',
    activeMove,
    checkerToMove,
    board,
    player,
    moves,
    origin: updatedOrigin,
    destination: updatedDestination,
  }
}

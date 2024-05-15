import { Moved, Moving, NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Bar, Point } from '../Checkercontainer'
import { hit } from './Hit'

export const reenter = (
  state: Moving,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Bar,
  destination: Point
): Moved => {
  const { board } = state
  console.log(origin)
  console.log(destination.position)
  const originCheckers = (origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  ))
  const destinationCheckers = [...destination.checkers, checkerToMove]

  const updatedOrigin = board.bar[checkerToMove.color]
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
    activeMove,
    checkerToMove,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
  }
}

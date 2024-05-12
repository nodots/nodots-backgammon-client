import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Point } from '../Checkercontainer'

export const bearOff = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point,
  destination: Checkercontainer
): NodotsMoveState => {
  const { board } = state

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  ))
  const destinationCheckers = [...destination.checkers, checkerToMove]

  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point
  updatedDestination.checkers = destinationCheckers

  activeMove.from = updatedOrigin
  activeMove.to = updatedDestination

  return {
    ...state,
    kind: 'move',
    activeMove,
    checkerToMove,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
  }
}

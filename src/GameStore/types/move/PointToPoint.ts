import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Point } from '../Checkercontainer'
import { hit } from './Hit'

export const pointToPoint = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point
): NodotsMoveState => {
  const { player, board } = state
  const originPosition = origin.position[player.moveDirection]
  const delta = activeMove.dieValue * -1
  const destinationPosition = originPosition + delta
  const destination = board.points.find(
    (point) => point.position[player.moveDirection] === destinationPosition
  ) as Point

  if (
    destination.checkers.length > 1 &&
    destination.checkers[0].color !== checkerToMove.color
  ) {
    return {
      ...state,
    }
  }

  if (
    destination.checkers.length === 1 &&
    destination.checkers[0].color !== checkerToMove.color
  ) {
    hit(state, destination)
  }

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  ))
  const destinationCheckers = [...destination.checkers, checkerToMove]
  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point
  updatedOrigin.checkers = originCheckers
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

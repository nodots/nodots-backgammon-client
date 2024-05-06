import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Bar, Point } from '../Checkercontainer'
import { hit } from './Hit'

export const reenter = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Bar
): NodotsMoveState => {
  const { player, board } = state
  const destinationPosition = 25 - activeMove.dieValue
  const destination = state.board.points.find(
    (point) => point.position[player.moveDirection] === destinationPosition
  ) as Point
  console.log('[reenter] origin:', origin)

  activeMove.from = origin
  activeMove.to = destination
  console.log('[reenter] activeMove:', activeMove)

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
  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point
  origin.checkers = originCheckers
  updatedDestination.checkers = destinationCheckers
  activeMove.from = origin
  activeMove.to = updatedDestination
  return {
    ...state,
    kind: 'move',
    activeMove,
    checkerToMove,
    origin,
    destination: updatedDestination,
    board,
  }
}

import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Point } from '../Checkercontainer'
import { pointToPoint } from './PointToPoint'

export const bearOff = (
  state: NodotsMoveState, // FIXME: narrow state
  activeMove: NodotsMove,
  origin: Point
): NodotsMoveState => {
  const { player, board } = state
  const originPosition = origin.position[player.moveDirection]
  const delta = activeMove.dieValue * -1
  const destinationPosition = originPosition + delta

  if (destinationPosition < 0) {
    const destination = board.off[activeMove.checker.color]
    const destinationCheckers = [...destination.checkers, checkerToMove]

    const originCheckers = (origin.checkers = origin.checkers.filter(
      (checker) => checker.id !== checkerToMove.id
    ))
    const updatedOrigin = board.points.find(
      (point) => point.id === origin.id
    ) as Point
    updatedOrigin.checkers = originCheckers
    destination.checkers = destinationCheckers
    activeMove.from = updatedOrigin
    activeMove.to = destination
    return {
      ...state,
      kind: 'move',
      activeMove,
      checkerToMove,
      origin: updatedOrigin,
      destination,
      board,
    }
  } else {
    return pointToPoint(state, checkerToMove)
  }
}

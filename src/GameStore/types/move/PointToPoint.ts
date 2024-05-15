import { NodotsMove, NodotsMoveState, isBearOffing } from '.'
import { Checker } from '../Checker'
import { Checkercontainer, Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'
import { bearOff } from './BearOff'
import { hit } from './Hit'

export const pointToPoint = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Point,
  destination: Checkercontainer
): NodotsMoveState => {
  const { board, player } = state

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  ))

  if (isBearOffing(board, player)) {
    return bearOff(state, checkerToMove, activeMove, origin, destination)
  }

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
    player: player as MovingPlayer,
    activeMove,
    checkerToMove,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
  }
}

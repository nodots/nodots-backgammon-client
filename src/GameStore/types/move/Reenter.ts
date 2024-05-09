import { NodotsMove, NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Bar, Point } from '../Checkercontainer'
import { hit } from './Hit'

export const reenter = (
  state: NodotsMoveState,
  checkerToMove: Checker,
  activeMove: NodotsMove,
  origin: Bar,
  destination: Point
): NodotsMoveState => {
  const { board } = state

  activeMove.from = origin
  activeMove.to = destination

  console.log('[reenter] origin:', origin)
  console.log('[reenter] destination:', destination)
  console.log('[reenter] activeMove:', activeMove)

  if (
    destination.checkers.length > 1 &&
    destination.checkers[0].color !== checkerToMove.color
  ) {
    throw Error('THIS SPACE OCCUPIED')
  }
  return state
}

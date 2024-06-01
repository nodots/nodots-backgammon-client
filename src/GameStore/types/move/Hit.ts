import { NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Checkercontainer } from '../Checkercontainer'

export const hit = (
  state: NodotsMoveState,
  target: Checkercontainer
): NodotsMoveState => {
  if (target.kind !== 'point') {
    return state
  }
  const hitChecker = target.checkers.pop() as Checker
  state.board.bar[hitChecker.color].checkers.push(hitChecker)

  // FIXME: Need to return updated state
  return state
}

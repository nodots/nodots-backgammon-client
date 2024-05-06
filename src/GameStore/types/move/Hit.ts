import { NodotsMoveState } from '.'
import { Checker } from '../Checker'
import { Point } from '../Checkercontainer'

export const hit = (state: NodotsMoveState, target: Point): NodotsMoveState => {
  const hitChecker = target.checkers.pop() as Checker
  state.board.bar[hitChecker.color].checkers.push(hitChecker)

  return state
}

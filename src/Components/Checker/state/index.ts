import { Move } from '../../../game/move'
import { Checkerbox } from '../../Checkerbox/state/types'
import { Checker, isChecker } from './types'

export { isChecker }
export type { Checker }

export const isCheckerInTurn = (origin: Checkerbox, moves: Move[]): boolean => {
  let inTurn: boolean = false
  const ctm = origin.checkers[origin.checkers.length - 1]
  if (
    moves.length > 0 &&
    moves.find((m) => m.checker?.id !== undefined && m.checker.id === ctm.id)
  ) {
    inTurn = true
  }
  return inTurn
}

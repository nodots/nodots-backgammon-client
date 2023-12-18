import { CheckerboxPosition as CheckerboxPosition } from '../../../../game'
import { Checker } from '../../../Checker/state/types'

/**
 * Checkers can be in three different places:
 *  1. Point: One of the triangle things on the board. Default.
 *  2. Bar: On the bar between the points after being "hit" by opponent.
 *  3. Off: Successfully moved off the board.
 */
export type Checkerbox = {
  id: string
  checkers: Checker[]
  position: CheckerboxPosition
  positionClockwise: CheckerboxPosition
  positionCounterClockwise: CheckerboxPosition
}

export const isCheckerbox = (v: any): v is Checkerbox => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex((k) => k === 'id')
  const checkersIndex = keys.findIndex((k) => k === 'checkers')
  const positionIndex = keys.findIndex((k) => k === 'position')
  if (idIndex === -1 || checkersIndex === -1 || positionIndex === -1) {
    return false
  }
  return true
}

export const canAcceptChecker = (checkerbox: Checkerbox, checker: Checker) => {
  let canAcceptChecker = false
  if (checkerbox.checkers.length <= 1) {
    canAcceptChecker = true
  }
  if (
    checkerbox.checkers.length >= 1 &&
    checkerbox.checkers.filter((c) => c.color !== checker.color).length === 0
  ) {
    canAcceptChecker = true
  }
  return canAcceptChecker
}

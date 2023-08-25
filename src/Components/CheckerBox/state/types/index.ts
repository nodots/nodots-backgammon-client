import { CheckerBoxPosition } from '../../../../game'
import { Checker } from '../../../Checker/state/types'
import { Color } from '../../../../game'

/**
* Checkers can be in three different places:
*  1. Point: One of the triangle things on the board. Default.
*  2. Rail: On the bar between the points after being "hit" by opponent.
*  3. Off: Successfully moved off the board.
*/
export type CheckerBox = {
  id: string,
  checkers: Checker[]
  position: CheckerBoxPosition
}

export const isCheckerBox = (v: any): v is CheckerBox => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex(k => k === 'id')
  const checkersIndex = keys.findIndex(k => k === 'checkers')
  const positionIndex = keys.findIndex(k => k === 'position')
  if (idIndex === -1 || checkersIndex === -1 || positionIndex === -1) {
    return false
  }

  return true
}

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
  color?: Color | undefined
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

  // if (typeof v.id !== 'string') {
  //   return false
  // }

  // console.log(v.checkers)

  // if (
  //   (typeof v.position === 'number' &&
  //     (v.position < 1 || v.position > 24)
  //   ) || (
  //     typeof v.position === 'string' &&
  //     v.position !== 'rail' &&
  //     v.position !== 'off')
  // ) {
  //   return false
  // }

  return true
}

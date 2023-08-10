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


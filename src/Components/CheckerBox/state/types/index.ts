import { Color, CheckerBoxPosition } from '../../../../models'
import { Checker } from '../../../Checker/state/types'

// export interface ICheckerBox {
//   color?: Color,
//   checkers?: Checker[]
//   position: CheckerBoxPosition
// }

/**
* Checkers can be in three different places:
*  1. Point: One of the triangle things on the board. Default.
*  2. Rail: On the bar between the points after being "hit" by opponent.
*  3. Off: Successfully moved off the board.
*/
export type CheckerBox = {
  color: Color | undefined
  checkers: Checker[]
  position: CheckerBoxPosition
}


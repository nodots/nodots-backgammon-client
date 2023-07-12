import { Color, CheckerBoxType, generateId } from '.'
import { Checker } from './Checker'

// TODO: Make CheckerBox an abstract class. Point, Rail, and Off inherit from 
// CheckerBox.

/**
* Checkers can be in three different places:
*  1. Point: One of the triangle things on the board. Default.
*  2. Rail: On the bar between the points after being "hit" by opponent.
*  3. Off: Successfully moved off the board.
*/
export class CheckerBox {
  id: string
  type: CheckerBoxType
  color: Color | undefined
  checkers: Checker[]

  constructor (type: CheckerBoxType, color?: Color, checkers?: Checker[]) {
    this.id = generateId()
    this.type = type
    color ? this.color = color : this.color = undefined
    checkers ? this.checkers = checkers : this.checkers = []
  }
}
import { CheckerBoxPosition, Color, generateId } from '.'
import { Checker } from './Checker'


export interface ICheckerBox {
  color?: Color,
  checkers?: Checker[]
  position: CheckerBoxPosition
}

/**
* Checkers can be in three different places:
*  1. Point: One of the triangle things on the board. Default.
*  2. Rail: On the bar between the points after being "hit" by opponent.
*  3. Off: Successfully moved off the board.
*/
export abstract class CheckerBox {
  id: string
  color: Color | undefined
  checkers: Checker[]
  position: CheckerBoxPosition

  constructor (attrs: ICheckerBox) {
    this.id = generateId()

    this.color = attrs.color ? attrs.color : undefined
    this.checkers = attrs.checkers ? attrs.checkers : []
    this.position = attrs.position
  }
}


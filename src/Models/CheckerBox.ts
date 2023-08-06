import { Color, CheckerBoxType, generateId } from '.'

// TODO: Make CheckerBox an abstract class. Point, Rail, and Off inherit from 
// CheckerBox.
import { GameError } from './Error'
import { Checker } from './Checker'
import { Point } from './Point'
import { Off } from './Off'
import { Rail } from './Rail'

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
  parent?: Point | Rail | Off

  constructor ({ type, parent, color, checkers }: { type: CheckerBoxType; parent: Point | Rail | Off, color?: Color; checkers?: Checker[] }) {
    this.id = generateId()
    this.type = type

    this.color = color ? color : undefined
    this.checkers = checkers ? checkers : []
    switch (this.type) {
      case CheckerBoxType.POINT:
        this.parent = parent as Point
        break
      case CheckerBoxType.RAIL:
        this.parent = parent as Rail
        break
      case CheckerBoxType.OFF:
        this.parent = parent as Off
        break
      default:
        throw new GameError({ model: 'CheckerBox', errorMessage: 'Unknown type' })
    }
  }
}
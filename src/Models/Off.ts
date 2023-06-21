
import { Color } from './Backgammon'
import { PointPosition, Point } from './Point'

export class Off extends Point {
  color: Color

  constructor (color: Color) {
    const position: PointPosition = 'off'
    super(position)
    this.color = color
  }

}
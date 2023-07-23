import { Die } from './Die'
import { Color } from './'

export class RollSurface {
  color: Color
  dice: [Die, Die]

  constructor (color: Color) {
    this.color = color
    this.dice = [
      new Die({ color: color }),
      new Die({ color: color }),
    ]
  }
}
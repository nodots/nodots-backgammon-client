import { Color, generateId } from '.'
import { Die } from './Die'

export class RollSurface {
  id: string
  color: Color
  dice: Die[]

  constructor (color: Color, dice?: Die[]) {
    this.id = generateId()
    this.color = color
    this.dice = dice ||
      [
        new Die({ color, order: 0 }),
        new Die({ color, order: 1 })
      ]
  }
}
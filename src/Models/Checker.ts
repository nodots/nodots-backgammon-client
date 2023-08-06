import { Color, generateId } from '.'
import { CheckerBox } from './CheckerBox'

/**
 * Checkers are the pieces that move around the board. By tradition they are 
 * "black" and "white" (The Color type in this model)
 */
export class Checker {
  id: string
  color: Color
  parent: CheckerBox

  constructor (color: Color, parent: CheckerBox) {
    this.id = generateId()
    this.color = color
    this.parent = parent
  }
}


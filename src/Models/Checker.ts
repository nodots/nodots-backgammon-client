import { Color, generateId } from '.'

/**
 * Checkers are the pieces that move around the board. By tradition they are 
 * "black" and "white" (The Color type in this model)
 */
export class Checker {
  id: string
  color: Color

  constructor (color: Color) {
    this.id = generateId()
    this.color = color
  }

}


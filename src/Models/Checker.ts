import { Color, generateId } from '.'

export class Checker {
  id: string
  color: Color

  constructor (color: Color) {
    this.id = generateId()
    this.color = color
  }

}


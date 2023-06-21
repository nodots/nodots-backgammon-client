import { Color, DieValue, generateId } from './Backgammon'

export class Die {
  id: string
  color: Color
  value: DieValue

  constructor (color: Color, currentValue?: DieValue) {
    this.id = generateId()
    this.color = color
    this.value = currentValue || 1
  }

  roll (): number {
    const result = Math.floor(Math.random() * 6) + 1
    console.log(`rolling ${this.id}--results is ${result}`)
    return result as DieValue as number
  }
}

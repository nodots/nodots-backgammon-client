import { Color, DieValue, generateId } from '.'

export class Die {
  id: string
  order: 0 | 1
  color: Color
  value: DieValue | undefined

  constructor ({ color, currentValue, order }: { color: Color; currentValue?: DieValue, order: 0 | 1 }) {
    this.id = generateId()
    this.color = color
    this.order = order
    this.value = currentValue
  }

  static roll (): DieValue {
    const result = Math.floor(Math.random() * 6) + 1 as DieValue
    return result
  }
}

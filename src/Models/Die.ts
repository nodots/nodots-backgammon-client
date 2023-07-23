import { Color, DieValue, generateId } from '.'

export class Die {
  id: string
  order: 1 | 2
  color: Color
  value: DieValue | undefined

  constructor ({ color, currentValue, order }: { color: Color; currentValue?: DieValue, order: 1 | 2 }) {
    this.id = generateId()
    this.color = color
    this.order = order
    this.value = currentValue || undefined
  }

  roll (): DieValue {
    const result = Math.floor(Math.random() * 6) + 1 as DieValue
    return result
  }
}

import { Color, DieValue, generateId } from '.'

export type DieOrder = 1 | 2

export class Die {
  id: string
  order: DieOrder
  color: Color
  value: DieValue | undefined

  constructor ({ order, color, currentValue }: { order: DieOrder, color: Color; currentValue?: DieValue }) {
    this.id = generateId()
    this.order = order
    this.color = color
    this.value = currentValue || undefined
  }

  roll (): DieValue {
    const result = Math.floor(Math.random() * 6) + 1 as DieValue
    return result
  }
}

import { Color, DieValue, generateId } from '.'

export class Die {
  id: string
  color: Color
  value: DieValue | undefined

  constructor ({ color, currentValue }: { color: Color; currentValue?: DieValue }) {
    this.id = generateId()
    this.color = color
    this.value = currentValue || undefined
  }

  roll (): DieValue {
    const result = Math.floor(Math.random() * 6) + 1 as DieValue
    return result
  }
}

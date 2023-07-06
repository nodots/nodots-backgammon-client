import { Color, CubeValue, generateId } from '.'

export class Cube {
  id: string
  value: CubeValue
  controllingColor: Color | undefined

  constructor (value?: CubeValue) {
    this.id = generateId()
    this.value = value ? value : 2
  }
}

import { Color, CubeValue, generateId, MAX_CUBE_VALUE } from '.'

export class Cube {
  id: string
  value: CubeValue
  controllingColor: Color | undefined

  constructor ({ value, controllingColor }: { value?: CubeValue; controllingColor?: Color } = {}) {
    this.id = generateId()
    this.value = value ? value : 2
    this.controllingColor = controllingColor ? controllingColor : undefined
  }

  double (): CubeValue {
    if (this.value === MAX_CUBE_VALUE) {
      return this.value
    }
    return this.value * 2 as CubeValue
  }
}

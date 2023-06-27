import { Color, CubeValue, generateId } from './Backgammon'

export class Cube {
  id: string
  value: CubeValue
  controllingColor: Color | undefined

  constructor () {
    this.id = generateId()
    this.value = 'centered'
  }
}

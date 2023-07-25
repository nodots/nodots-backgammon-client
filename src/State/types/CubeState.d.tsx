import { Color, CubeValue } from '../../Models'

export type CubeState = {
  value: CubeValue
  controllingColor: Color | undefined
}

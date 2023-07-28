import { Color, CubeValue } from '../../models'

export type CubeState = {
  value: CubeValue
  controllingColor: Color | undefined
}

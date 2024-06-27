import { NodotsPlayer } from '../Stores/Player/Types'
import { generateId } from '../Types'

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64

export interface NodotsCube {
  id: string
  value: CubeValue
  owner: NodotsPlayer | undefined
}

export const buildCube = (): NodotsCube => {
  return {
    id: generateId(),
    value: 2,
    owner: undefined,
  }
}

export const double = (cube: NodotsCube): CubeValue => {
  let cubeValue = cube.value as number
  cubeValue = cubeValue === 64 ? cube.value : cube.value * 2
  return cubeValue as CubeValue
}

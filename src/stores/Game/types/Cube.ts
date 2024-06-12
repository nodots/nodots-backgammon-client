import { NodotsPlayer } from '../../Player/Types'

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64

export interface NodotsCube {
  id: string
  value: CubeValue
  owner: NodotsPlayer | undefined
}

export const double = (cube: NodotsCube): CubeValue => {
  let cubeValue = cube.value as number
  cubeValue = cubeValue === 64 ? cube.value : cube.value * 2
  return cubeValue as CubeValue
}

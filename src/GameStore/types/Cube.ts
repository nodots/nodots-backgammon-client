import { Player } from './Player'

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64

export interface Cube {
  id: string
  value: CubeValue
  owner: Player | undefined
}

export const double = (cube: Cube): CubeValue => {
  let cubeValue = cube.value as number
  cubeValue = cubeValue === 64 ? cube.value : cube.value * 2
  return cubeValue as CubeValue
}

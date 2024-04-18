import { Player } from './Player'

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64

export interface Cube {
  id: string
  value: CubeValue
  owner: Player | undefined
}

import { Player } from '../components/Player/state/types'
import { Cube } from '../components/Cube/state/types'
import { Board } from '../components/Board/state/types'

export type Game = {
  players: {
    white: Player,
    black: Player,
  }
  board: Board,
  cube: Cube
}
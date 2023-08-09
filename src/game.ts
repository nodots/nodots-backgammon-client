import { Color } from './models'
import { Cube, CubeValue } from './components/Cube/state'
import { Player, Turn } from './components/Player/state'
import { Board } from './components/Board/state'
import { Dice } from './components/Die/state'
import { TurnActionPayload } from './components/Player/state/reducers/turn'

export type Game = {
  board: Board
  dice: Dice
  cube: Cube
  players: {
    black: Player
    white: Player
  }
  activeTurn: Turn
  activeColor?: Color
  setCubeValue?: (value: CubeValue) => CubeValue
  initializeTurn?: (turn: TurnActionPayload) => Turn
}

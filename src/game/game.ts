import { v4 as uuid } from 'uuid'
import { Cube, CubeValue } from '../components/Cube/state'
import { Player, Turn } from '../components/Player/state'
import { Board } from '../components/Board/state'
import { Dice } from '../components/Die/state'
import { TurnActionPayload } from '../components/Player/state/reducers/turn'

export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'rail' | 'off'
export type GameErrorType = 'Game' | 'Turn' | 'Move' | 'Roll' | 'Player' | 'Die' | 'Cube' | 'CheckerBox' | 'Quadrant' | 'Point' | 'RollSurface'
export const generateId = (): string => {
  return uuid()
}

export class GameError extends Error {
  model: GameErrorType
  constructor ({ model, errorMessage }: { model?: GameErrorType; errorMessage: string }) {
    super(errorMessage)
    this.model = model || 'Game'
  }
}

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

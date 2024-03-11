import { v4 as uuid } from 'uuid'
import { Cube, CubeValue } from '../components/Cube/state/types'
import { Player } from './player'
// import { sanityCheckBoard } from '../components/Board/state/types'
import { Dice } from '../components/Die/state'
import { Turn } from './turn'
import { TurnActionPayload } from './turn.reducer'
import { BgApiPlayerBoard } from './integrations/bgweb-api'

export type Color = 'black' | 'white'
export type PlayerBoard = BgApiPlayerBoard
export type Board = {
  white: PlayerBoard
  black: PlayerBoard
}
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerboxPosition = number | 'bar' | 'off'
export type GameErrorType =
  | 'Configuration'
  | 'Game'
  | 'Turn'
  | 'Move'
  | 'Roll'
  | 'Player'
  | 'Die'
  | 'Cube'
  | 'Checkerbox'
  | 'Quadrant'
  | 'Point'
  | 'RollSurface'
export const CHECKERS_PER_PLAYER = 15

export const isColor = (c: unknown): c is Color => {
  if (c && typeof c === 'string' && (c === 'white' || c === 'black')) {
    return true
  }
  return false
}

export const generateId = (): string => {
  return uuid()
}

export class GameError extends Error {
  model: GameErrorType
  constructor({
    model,
    errorMessage,
  }: {
    model?: GameErrorType
    errorMessage: string
  }) {
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
  activeTurn?: Turn
  activeColor?: Color
  error?: GameError
  setCubeValue?: (value: CubeValue) => CubeValue
  initializeTurn?: (turn: TurnActionPayload) => Turn
  finalizeTurn?: () => void
}

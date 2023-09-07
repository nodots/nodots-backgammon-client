import { v4 as uuid } from 'uuid'
import { Cube, CubeValue } from '../components/Cube/state'
import { Player, Turn } from '../components/Player/state'
import { Board, POINT_COUNT, getCheckerBoxes } from '../components/Board/state'
import { Dice } from '../components/Die/state'
import { TurnActionPayload } from './turn.reducer'
import { sanityCheckBoard } from '../components/Board/state'
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'rail' | 'off'
export type GameErrorType = 'Configuration' | 'Game' | 'Turn' | 'Move' | 'Roll' | 'Player' | 'Die' | 'Cube' | 'CheckerBox' | 'Quadrant' | 'Point' | 'RollSurface'
export const CHECKERS_PER_PLAYER = 15

export const isColor = (c: unknown): c is Color => {
  if (c && typeof c === 'string' && (c === 'white' || c === 'black')) {
    return true
  }
  return false
}

const generateId = (): string => {
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
  board: Bo
  export coard
  dice: Dice
  cube: Cube
  players: {
    black: Player
    white: Player
  }
  activeTurn: Turn
  activeColor?: Color
  error?: GameError
  setCubeValue?: (value: CubeValue) => CubeValue
  initializeTurn?: (turn: TurnActionPayload) => Turn
  finalizeTurn?: () => void
}


export const sanityCheck = (game: Game): boolean => {
  let isSane = true

  isSane = sanityCheckBoard(game.board)

  return isSane
}

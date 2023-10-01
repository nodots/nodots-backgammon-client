import { v4 as uuid } from 'uuid'
import { Cube, CubeValue } from '../components/cube/state'
import { Player, Turn } from '../components/player/state'
import { Board, POINT_COUNT, getCheckerBoxes } from '../components/board/state'
import { Dice } from '../components/die/state'
import { TurnActionPayload } from './turn.reducer'
import { sanityCheckBoard } from '../components/board/state'
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'bar' | 'off'
export type GameErrorType = 'Configuration' | 'Game' | 'Turn' | 'Move' | 'Roll' | 'Player' | 'Die' | 'Cube' | 'CheckerBox' | 'Quadrant' | 'Point' | 'RollSurface'
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
  activeTurn?: Turn
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

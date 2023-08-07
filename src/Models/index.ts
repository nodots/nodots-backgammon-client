import { v4 as uuid } from 'uuid'
import { GameError } from './Error'

export const MODEL_DEBUG = false
export const MAX_CUBE_VALUE = 64
export const POINT_COUNT = 24
export const CHECKERS_PER_PLAYER = 15
export const INIT_PIP_COUNT = 167

export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'rail' | 'off'


// For importing board
export interface CheckerProp {
  color: string,
  checkerCount: number,
  position: CheckerBoxPosition
}

const generateId = (): string => {
  return uuid()
}

export {
  GameError,
  generateId
}


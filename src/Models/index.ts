import { v4 as uuid } from 'uuid'
import { GameError } from './Error'
import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'
import { Game } from './Game'
import { Die } from './Die'
import { DieOrder, DieValue } from '../state/dice/types'
import { Cube } from './Cube'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { Point } from './Point'
import { Rail } from './Rail'
import { RollSurface } from './RollSurface'
import { Off } from './Off'
import { Turn, TurnStatus } from './Turn'
import { Move, MoveStatus } from './Move'

export const modelDebug = false
export const MAX_CUBE_VALUE = 64

export type CheckerMoveType = {
  dieValue: DieValue | undefined
  origin: CheckerBox | undefined,
  destination: CheckerBox | undefined
  completed: boolean | undefined
}
export type MoveType = {
  board: Board,
  checker: CheckerMoveType,
  origin: CheckerBox,
  destination: CheckerBox,
  completed: boolean
}

export enum QuadrantLocation {
  NE,
  NW,
  SE,
  SW
}

export type Color = 'black' | 'white'
export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64
export type RollResults = DieValue[]
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'rail' | 'off'

export const isDieValue = (v: unknown): v is DieValue => {
  if (v && typeof v === 'number' && v >= 1 && v <= 6) {
    return true
  }
  return false
}

export const isDieOrder = (o: unknown): o is DieOrder => {
  if (o && typeof o === 'number' && o >= 0 && o <= 1) {
    return true
  }
  return false
}

export const isPoint = (cb: CheckerBox): cb is Point => {
  if (cb && typeof cb.position === 'number') {
    return true
  }
  return false
}

export const isRail = (cb: CheckerBox): cb is Rail => {
  if (cb && cb.position === 'rail') {
    return true
  }
  return false
}

export const isOff = (cb: CheckerBox): cb is Off => {
  if (cb && cb.position === 'off') {
    return true
  }
  return false
}



export interface GameMove {
  checkerId: string,
  playerId: string,
  roll: [number, number],
  startCheckerBoxId: string,
  endCheckerBoxId: string,
}

export interface CheckerProp {
  position: number | 'rail' | 'off'
  checkerCount: number
  color: Color
}

export interface PlayerProp {
  id: string,
  color: Color,
  firstName: string,
  lastName: string,
  nickName: string,
  checkers: Checker[],
  dice: Die[]
}

export const POINT_COUNT = 24
export const CHECKERS_PER_PLAYER = 15
export const INIT_PIP_COUNT = 167
export const INIT_BOARD_SETUP: CheckerProp[] = [
  {
    position: 1,
    checkerCount: 2,
    color: 'black'
  },
  {
    position: 6,
    checkerCount: 5,
    color: 'white'
  },
  {
    position: 8,
    checkerCount: 3,
    color: 'white'
  },
  {
    position: 12,
    checkerCount: 5,
    color: 'black'
  },
  {
    position: 13,
    checkerCount: 5,
    color: 'white'
  },
  {
    position: 17,
    checkerCount: 3,
    color: 'black'
  },
  {
    position: 19,
    checkerCount: 5,
    color: 'black'
  },
  {
    position: 24,
    checkerCount: 2,
    color: 'white'
  }
]

const generateId = (): string => {
  return uuid()
}

export type {
  DieOrder,
  DieValue,
}

export {
  GameError,
  Board,
  Checker,
  CheckerBox,
  Die,
  Cube,
  Game,
  Player,
  Quadrant,
  Point,
  Rail,
  RollSurface,
  Off,
  Turn,
  TurnStatus,
  Move,
  MoveStatus,
  generateId
}


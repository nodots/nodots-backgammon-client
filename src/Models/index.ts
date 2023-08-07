import { v4 as uuid } from 'uuid'
import { GameError } from './Error'

export const MODEL_DEBUG = false
export const MAX_CUBE_VALUE = 64
export const POINT_COUNT = 24
export const CHECKERS_PER_PLAYER = 15
export const INIT_PIP_COUNT = 167

// export type CheckerMoveType = {
//   dieValue: DieValue | undefined
//   origin: CheckerBox | undefined,
//   destination: CheckerBox | undefined
//   completed: boolean | undefined
// }
// export type MoveType = {
//   board: Board,
//   checker: CheckerMoveType,
//   origin: CheckerBox,
//   destination: CheckerBox,
//   completed: boolean
// }

export enum QuadrantLocation {
  NE,
  NW,
  SE,
  SW
}

export type Color = 'black' | 'white'
// export type RollResults = DieValue[]
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerBoxPosition = number | 'rail' | 'off'

// export interface GameMove {
//   checkerId: string,
//   playerId: string,
//   roll: [number, number],
//   startCheckerBoxId: string,
//   endCheckerBoxId: string,
// }

export interface CheckerProp {
  position: number | 'rail' | 'off'
  checkerCount: number
  color: Color
}

// export interface PlayerProp {
//   id: string,
//   color: Color,
//   firstName: string,
//   lastName: string,
//   nickName: string,
//   checkers: Checker[],
//   dice: Die[]
// }


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

export {
  GameError,
  generateId
}


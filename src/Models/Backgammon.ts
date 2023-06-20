import { v4 as uuid } from 'uuid'
import { Checker } from './Checker'
import { Game } from './Game'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { Point } from './Point'

export type QuadrantLocation = 'ne' | 'nw' | 'sw' | 'se'
export type Color = 'black' | 'white'
export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type CubeValue = 'centered' | 2 | 4 | 8 | 16 | 32 | 64

export interface PointProp {
  position: number,
  checkerCount: number,
  color: Color
}

export const POINT_COUNT = 24
export const CHECKERS_PER_PLAYER = 15
export const INIT_PIP_COUNT = 167
export const INIT_BOARD_SETUP: PointProp[] = [
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

export {
  Board,
  Checker,
  Game,
  Player,
  Quadrant,
  Point
}

// static
export const generateId = (): string => {
  return uuid()
}

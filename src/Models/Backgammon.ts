import { v4 as uuid } from 'uuid'
import { Checker } from './Checker'
import { Game } from './Game'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { Point } from './Point'

export const NUMBER_POINTS = 24
export const CHECKERS_PER_PLAYER = 15
export const INIT_PIP_COUNT = 167

export type QuadrantLocation = 'ne' | 'nw' | 'sw' | 'se'
export type Color = 'black' | 'white'
export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type CubeValue = 'centered' | 2 | 4 | 8 | 16 | 32 | 64

export {
  Board,
  Checker,
  Game,
  Player,
  Quadrant,
  Point
}

// private
export const generateId = (): string => {
  return uuid()
}

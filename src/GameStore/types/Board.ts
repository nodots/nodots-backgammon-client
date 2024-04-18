import { generateId } from '.'
import { NodotsGameCheckers } from './Checker'
import { Players } from './Player'
import { Quadrant } from './Quadrant'
import { Bar, Off, Point, Checkercontainer } from './Checkercontainer'
import { buildQuadrant } from './Quadrant'
import { Color } from '.'
import { Checker } from './Checker'
import { getCheckercontainers } from './Checkercontainer'
import { BgApiPlayerBoard } from '../integrations/bgweb-api'

export type Latitude = 'north' | 'south'
export type Longitude = 'east' | 'west'

export interface Board {
  quadrants: {
    east: {
      north: Quadrant
      south: Quadrant
    }
    west: {
      north: Quadrant
      south: Quadrant
    }
  }
  bar: [Bar, Bar]
  off: [Off, Off]
}

export const buildBoard = (
  players: Players,
  checkers: NodotsGameCheckers
): Board => {
  return {
    quadrants: {
      east: {
        north: buildQuadrant(19, 'north', 'east', players, checkers),
        south: buildQuadrant(1, 'south', 'east', players, checkers),
      },
      west: {
        north: buildQuadrant(13, 'north', 'west', players, checkers),
        south: buildQuadrant(7, 'south', 'west', players, checkers),
      },
    },
    bar: [
      { kind: 'bar', id: generateId(), color: 'white', checkers: [] },
      { kind: 'bar', id: generateId(), color: 'black', checkers: [] },
    ],
    off: [
      { kind: 'off', id: generateId(), color: 'white', checkers: [] },
      { kind: 'off', id: generateId(), color: 'black', checkers: [] },
    ],
  }
}

export const whiteBoard: PlayerBoard = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 5,
  7: 0,
  8: 3,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 5,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 2,
  bar: 0,
}

export const blackBoard: PlayerBoard = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 5,
  7: 0,
  8: 3,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 5,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 2,
  bar: 0,
}

const getCheckers = (board: Board): Checker[] => {
  const checkercontainers = getCheckercontainers(board)
  const checkers: Checker[] = []

  checkercontainers.map((checkercontainer) =>
    checkers.push(...checkercontainer.checkers)
  )
  return checkers
}

export const getCheckersForColor = (board: Board, color: Color): Checker[] =>
  getCheckers(board).filter((checker) => checker.color === color)

export const getChecker = (board: Board, id: string): Checker => {
  const checker = getCheckers(board).find((checker) => checker.id === id)
  if (!checker) {
    throw Error(`No checker found for ${id}`)
  }
  return checker
}

export const getPoints = (board: Board): Point[] => [
  ...board.quadrants.east.north.points,
  ...board.quadrants.east.south.points,
  ...board.quadrants.west.north.points,
  ...board.quadrants.west.south.points,
]

export const getCheckercontainerById = (
  board: Board,
  id: string
): Checkercontainer => {
  const container = getCheckercontainers(board).find((c) => c.id === id)
  if (!container) {
    throw Error(`No checkercontainer found for ${id}`)
  }
  return container
}
export type PlayerBoard = BgApiPlayerBoard
export type PlayerBoards = {
  white: PlayerBoard
  black: PlayerBoard
}

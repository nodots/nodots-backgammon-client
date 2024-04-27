import { MoveDirection, PointPosition, generateId } from '.'
import {
  Players,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'
import { Bar, Off, Point, Checkercontainer } from './Checkercontainer'
import { Color } from '.'
import { Checker } from './Checker'

export type Latitude = 'north' | 'south'
export type Longitude = 'east' | 'west'

export type Points = [
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point,
  Point
]
export interface NodotsBoardStore {
  points: Point[]
  bar: [Bar, Bar]
  off: [Off, Off]
}

export type CheckercontainerCheckers =
  | []
  | [Checker]
  | [Checker, Checker]
  | [Checker, Checker, Checker]
  | [Checker, Checker, Checker, Checker]
  | [Checker, Checker, Checker, Checker, Checker]
  | [Checker, Checker, Checker, Checker, Checker, Checker]
  | [Checker, Checker, Checker, Checker, Checker, Checker, Checker]
  | [Checker, Checker, Checker, Checker, Checker, Checker, Checker, Checker]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]
  | [
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker,
      Checker
    ]

export const getLatLongForClockwisePosition = (
  position: PointPosition
): [Latitude, Longitude] => {
  if (position <= 6) {
    return ['south', 'east']
  } else if (position >= 7 && position <= 12) {
    return ['south', 'west']
  } else if (position >= 13 && position <= 17) {
    return ['north', 'west']
  } else {
    return ['north', 'east']
  }
}

export const buildPoints = (players: Players): Point[] => {
  const points: Point[] = []
  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseBoard = clockwisePlayer.board
  const counterclockwiseBoard = counterclockwisePlayer.board

  clockwiseBoard?.points.forEach((point) =>
    console.log(
      `${point.position.clockwise} ${point.position.counterclockwise}`,
      point.checkers
    )
  )
  counterclockwiseBoard?.points.forEach((point) =>
    console.log(
      `${point.position.clockwise} ${point.position.counterclockwise}`,
      point.checkers
    )
  )

  if (clockwiseBoard && counterclockwiseBoard) {
    for (let i = 0; i < 24; i++) {
      const checkers: Checker[] = []
      const clockwisePosition: PointPosition = (24 - i) as PointPosition
      const counterclockwisePosition: PointPosition = (i + 1) as PointPosition

      const clockwisePoint = clockwiseBoard.points.find(
        (p) => p.position.clockwise === clockwisePosition
      )

      const counterclockwisePoint = counterclockwiseBoard.points.find(
        (p) => p.position.counterclockwise === counterclockwisePosition
      )

      if (clockwisePoint) {
        checkers.push(...clockwisePoint.checkers)
      }

      if (counterclockwisePoint) {
        checkers.push(...counterclockwisePoint.checkers)
      }

      const point: Point = {
        id: generateId(),
        kind: 'point',
        position: {
          clockwise: clockwisePosition,
          counterclockwise: counterclockwisePosition,
        },
        checkers,
      }
      points.push(point)
    }
  }
  return points
}
export const buildNodotsBoardStore = (players: Players): NodotsBoardStore => {
  return {
    points: buildPoints(players),
    bar: [
      {
        kind: 'bar',
        id: generateId(),
        color: 'white',
        position: 'bar',
        checkers: [],
      },
      {
        kind: 'bar',
        position: 'bar',
        id: generateId(),
        color: 'black',
        checkers: [],
      },
    ],
    off: [
      {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'white',
        checkers: [],
      },
      {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'black',
        checkers: [],
      },
    ],
  }
}

export const getCheckers = (board: NodotsBoardStore): Checker[] => {
  const checkercontainers = getCheckercontainers(board)
  const checkers: Checker[] = []

  checkercontainers.map((checkercontainer) =>
    checkers.push(...checkercontainer.checkers)
  )
  return checkers
}

export const getCheckersForColor = (
  board: NodotsBoardStore,
  color: Color
): Checker[] => getCheckers(board).filter((checker) => checker.color === color)

export const getPoints = (board: NodotsBoardStore): Point[] => board.points
export const getBars = (board: NodotsBoardStore): [Bar, Bar] => board.bar
export const getOffs = (board: NodotsBoardStore): [Off, Off] => board.off
export const getCheckercontainers = (
  board: NodotsBoardStore
): Checkercontainer[] => {
  const points = getPoints(board) as Checkercontainer[]
  const bar = getBars(board) as Checkercontainer[]
  const off = getOffs(board) as Checkercontainer[]
  return points.concat(...bar).concat(...off)
}

export const getCheckercontainerById = (
  board: NodotsBoardStore,
  id: string
): Checkercontainer => {
  const container = getCheckercontainers(board).find((c) => c.id === id)
  if (!container) {
    throw Error(`No checkercontainer found for ${id}`)
  }
  return container
}

export type PlayerBoard = {
  points: [
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point,
    Point
  ]
  bar: Bar
  off: Off
}

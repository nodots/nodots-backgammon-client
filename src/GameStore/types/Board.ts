import { MoveDirection, PointPosition, generateId } from '.'
import {
  Players,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'
import { Bar, Off, Point, Checkercontainer } from './Checkercontainer'
import { Color } from '.'
import { Checker, generateCheckersForCheckercontainerId } from './Checker'

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
  bar: {
    white: Bar
    black: Bar
  }
  off: {
    white: Off
    black: Off
  }
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

const buildPoints = (players: Players): Points => {
  const tempPoints: Point[] = []
  for (let i = 0; i < 24; i++) {
    const pointId = generateId()
    const clockwiseColor = getClockwisePlayer(players).color
    const counterclockwiseColor = getCounterclockwisePlayer(players).color
    const clockwisePosition: PointPosition = (i + 1) as number as PointPosition
    const counterclockwisePosition = (25 - clockwisePosition) as PointPosition

    const checkers: Checker[] = []
    switch (clockwisePosition) {
      case 24:
        checkers.push(
          ...generateCheckersForCheckercontainerId(clockwiseColor, pointId, 2)
        )
        break
      case 13:
        checkers.push(
          ...generateCheckersForCheckercontainerId(clockwiseColor, pointId, 5)
        )
        break
      case 8:
        checkers.push(
          ...generateCheckersForCheckercontainerId(clockwiseColor, pointId, 3)
        )
        break
      case 6:
        checkers.push(
          ...generateCheckersForCheckercontainerId(clockwiseColor, pointId, 5)
        )
        break
      default:
      // noop
    }
    switch (counterclockwisePosition) {
      case 24:
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            counterclockwiseColor,
            pointId,
            2
          )
        )
        break
      case 13:
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            counterclockwiseColor,
            pointId,
            5
          )
        )
        break
      case 8:
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            counterclockwiseColor,
            pointId,
            3
          )
        )
        break
      case 6:
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            counterclockwiseColor,
            pointId,
            5
          )
        )
        break
      default:
      // noop
    }
    const point: Point = {
      id: pointId,
      kind: 'point',
      position: {
        clockwise: clockwisePosition,
        counterclockwise: counterclockwisePosition,
      },
      checkers,
    }
    tempPoints.push(point)
  }

  if (tempPoints.length === 24) {
    return tempPoints as Points
  } else {
    throw new Error(`invalid tempPoints length ${tempPoints.length}`)
  }
}

export const buildNodotsBoardStore = (players: Players): NodotsBoardStore => {
  return {
    points: buildPoints(players),
    bar: {
      white: {
        kind: 'bar',
        id: generateId(),
        color: 'white',
        position: 'bar',
        checkers: [],
      },
      black: {
        kind: 'bar',
        position: 'bar',
        id: generateId(),
        color: 'black',
        checkers: [],
      },
    },
    off: {
      white: {
        kind: 'off',
        id: generateId(),
        color: 'white',
        position: 'off',
        checkers: [],
      },
      black: {
        kind: 'off',
        position: 'off',
        id: generateId(),
        color: 'black',
        checkers: [],
      },
    },
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
export const getBars = (board: NodotsBoardStore): Bar[] => [
  board.bar.white,
  board.bar.black,
]
export const getOffs = (board: NodotsBoardStore): Off[] => [
  board.off.white,
  board.off.black,
]
export const getCheckercontainers = (
  board: NodotsBoardStore
): Checkercontainer[] => {
  const points = getPoints(board) as Checkercontainer[]
  const bar = getBars(board) as Checkercontainer[]
  const off = getOffs(board) as Checkercontainer[]
  return points.concat(...bar).concat(...off)
}

export const getCheckercontainer = (
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

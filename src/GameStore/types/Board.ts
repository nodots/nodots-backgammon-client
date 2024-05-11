import { Color, PointPosition, generateId } from '.'
import { Checker, generateCheckersForCheckercontainerId } from './Checker'
import { Bar, Checkercontainer, Off, Point } from './Checkercontainer'
import {
  NodotsPlayers,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'

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

const buildPoints = (players: NodotsPlayers): Points => {
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
    throw Error(`invalid tempPoints length ${tempPoints.length}`)
  }
}

export const buildNodotsBoardStore = (
  players: NodotsPlayers
): NodotsBoardStore => {
  return {
    points: buildPoints(players),
    bar: {
      white: {
        id: generateId(),
        kind: 'bar',
        position: 'bar',
        color: 'white',
        checkers: [],
      },
      black: {
        id: generateId(),
        kind: 'bar',
        position: 'bar',
        color: 'black',
        checkers: [],
      },
    },
    off: {
      white: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'white',
        checkers: [],
      },
      black: {
        id: generateId(),
        kind: 'off',
        position: 'off',
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

export const getPipCounts = (
  board: NodotsBoardStore,
  players: NodotsPlayers
) => {
  const pipCounts = {
    white: board.bar.white.checkers.length * 24,
    black: board.bar.black.checkers.length * 24,
  }

  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)
  board.points.map((point) => {
    if (point.checkers.length > 0) {
      const color = point.checkers[0].color

      if (color === clockwisePlayer.color) {
        pipCounts[color] += point.position.clockwise * point.checkers.length
      } else {
        pipCounts[color] +=
          point.position.counterclockwise * point.checkers.length
      }
    }
  })
  return pipCounts
}

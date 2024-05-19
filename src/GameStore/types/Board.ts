import { debug } from 'console'
import {
  Color,
  NodotsBoardImports,
  NodotsCheckercontainerImport,
  PointPosition,
  generateId,
} from '.'
import { Checker, generateCheckersForCheckercontainerId } from './Checker'
import { Bar, Checkercontainer, Off, Point } from './Checkercontainer'
import {
  NodotsPlayers,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'
import { BOARD_IMPORT_DEFAULT } from '../board-setups'

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

const buildBar = (
  players: NodotsPlayers,
  boards: NodotsBoardImports
): { white: Bar; black: Bar } => {
  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseBoard = boards.clockwise
  const counterclockwiseBoard = boards.counterclockwise

  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color

  const clockwiseBar = clockwiseBoard.find((cc) => cc.position === 'bar')
  const counterclockwiseBar = counterclockwiseBoard.find(
    (cc) => cc.position === 'bar'
  )

  const clockwiseId = generateId()
  const counterclockwiseId = generateId()

  const clockwiseCheckers = generateCheckersForCheckercontainerId(
    clockwiseColor,
    clockwiseId,
    clockwiseBar?.checkercount ? clockwiseBar.checkercount : 0
  )

  const counterclockwiseCheckers = generateCheckersForCheckercontainerId(
    counterclockwiseColor,
    counterclockwiseId,
    counterclockwiseBar?.checkercount ? counterclockwiseBar.checkercount : 0
  )

  if (clockwiseColor === 'black') {
    return {
      black: {
        id: clockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'black',
        checkers: clockwiseCheckers,
      },
      white: {
        id: counterclockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'white',
        checkers: counterclockwiseCheckers,
      },
    }
  } else {
    return {
      black: {
        id: counterclockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'black',
        checkers: counterclockwiseCheckers,
      },
      white: {
        id: clockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'white',
        checkers: clockwiseCheckers,
      },
    }
  }
}

const buildOff = (
  players: NodotsPlayers,
  boards: NodotsBoardImports
): { white: Off; black: Off } => {
  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseBoard = boards.clockwise
  const counterclockwiseBoard = boards.counterclockwise

  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color

  const clockwiseOff = clockwiseBoard.find(
    (cc) => cc.position === 'off'
  ) as unknown as NodotsCheckercontainerImport
  const counterclockwiseOff = counterclockwiseBoard.find(
    (cc) => cc.position === 'off'
  ) as unknown as NodotsCheckercontainerImport

  const clockwiseId = generateId()
  const counterclockwiseId = generateId()

  const clockwiseCheckers = generateCheckersForCheckercontainerId(
    clockwiseColor,
    clockwiseId,
    clockwiseOff?.checkercount ? clockwiseOff.checkercount : 0
  )

  const counterclockwiseCheckers = generateCheckersForCheckercontainerId(
    counterclockwiseColor,
    counterclockwiseId,
    counterclockwiseOff?.checkercount ? counterclockwiseOff.checkercount : 0
  )

  if (clockwiseColor === 'black') {
    return {
      black: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'black',
        checkers: clockwiseCheckers,
      },
      white: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'white',
        checkers: counterclockwiseCheckers,
      },
    }
  } else {
    return {
      black: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'black',
        checkers: counterclockwiseCheckers,
      },
      white: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color: 'white',
        checkers: clockwiseCheckers,
      },
    }
  }
}

export const buildBoard = (
  players: NodotsPlayers,
  boardImports?: NodotsBoardImports
): NodotsBoardStore => {
  let clockwiseBoardImport = BOARD_IMPORT_DEFAULT
  let counterclockwiseBoardImport = BOARD_IMPORT_DEFAULT

  if (boardImports && boardImports.clockwise) {
    clockwiseBoardImport = boardImports.clockwise
  }

  if (boardImports && boardImports.counterclockwise) {
    counterclockwiseBoardImport = boardImports.counterclockwise
  }

  const imports: NodotsBoardImports = {
    clockwise: clockwiseBoardImport,
    counterclockwise: counterclockwiseBoardImport,
  }
  const tempPoints: Point[] = []
  const clockwiseColor = getClockwisePlayer(players).color
  const counterclockwiseColor = getCounterclockwisePlayer(players).color

  for (let i = 0; i < 24; i++) {
    const pointId = generateId()
    const checkers: Checker[] = []

    const clockwisePosition: PointPosition = (i + 1) as number as PointPosition
    const counterclockwisePosition = (25 - clockwisePosition) as PointPosition

    clockwiseBoardImport.map((checkerbox) => {
      if (checkerbox.position === clockwisePosition) {
        const checkercount = checkerbox.checkercount
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            clockwiseColor,
            pointId,
            checkercount
          )
        )
      }
    })

    counterclockwiseBoardImport.map((checkerbox) => {
      if (checkerbox.position === counterclockwisePosition) {
        const checkercount = checkerbox.checkercount
        checkers.push(
          ...generateCheckersForCheckercontainerId(
            counterclockwiseColor,
            pointId,
            checkercount
          )
        )
      }
    })

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
    return {
      points: tempPoints,
      bar: buildBar(players, imports),
      off: buildOff(players, imports),
    }
  } else {
    throw Error(`invalid tempPoints length ${tempPoints.length}`)
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

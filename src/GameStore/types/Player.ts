import { Color, MoveDirection, PointPosition, generateId } from '.'
import { Dice } from './Dice'
import { PlayerBoard, Points } from './Board'
import { Point } from './Checkercontainer'
import { Checker, generateCheckersForLocationId } from './Checker'
import NodotsGameStore from '..'

export type Player = {
  id: string
  username: string
  color: Color
  board: PlayerBoard | undefined
  dice: Dice
  moveDirection: MoveDirection
  pipCount: number
  automation: {
    move: boolean
    roll: boolean
  }
}

export const getActivePlayer = (activeColor: Color, players: Players): Player =>
  activeColor === 'black' ? players.black : players.white

export const getClockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'counterclockwise'
    ? players.black
    : players.white

export const getPlayerForMoveDirection = (
  players: Players,
  direction: MoveDirection
): Player =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

export interface Players {
  white: Player
  black: Player
}

export const buildInitialPlayerBoard = (
  direction: MoveDirection,
  color: Color
): PlayerBoard => {
  console.log(`buildInitialPlayerBoard ${direction} ${color}`)
  let points: Points
  const tempPoints: Point[] = []
  for (let i = 0; i < 24; i++) {
    const pointId = generateId()
    const clockwisePosition: PointPosition = (i + 1) as number as PointPosition
    const counterclockwisePosition = (25 - clockwisePosition) as PointPosition
    console.log(clockwisePosition, counterclockwisePosition)
    const position =
      direction === 'clockwise' ? clockwisePosition : counterclockwisePosition

    const checkers: Checker[] = []
    switch (position) {
      case 24:
        checkers.push(...generateCheckersForLocationId(color, pointId, 2))
        break
      case 13:
        checkers.push(...generateCheckersForLocationId(color, pointId, 5))
        break
      case 8:
        checkers.push(...generateCheckersForLocationId(color, pointId, 3))
        break
      case 6:
        checkers.push(...generateCheckersForLocationId(color, pointId, 5))
        break
      default:
      // noop
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
    tempPoints.push(point)
  }

  if (tempPoints.length === 24) {
    points = tempPoints as Points
    return {
      points,
      bar: {
        id: generateId(),
        kind: 'bar',
        position: 'bar',
        color,
        checkers: [],
      },
      off: {
        id: generateId(),
        kind: 'off',
        position: 'off',
        color,
        checkers: [],
      },
    }
  } else {
    throw new Error(`invalid tempPoints length ${tempPoints.length}`)
  }
}

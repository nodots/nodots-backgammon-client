import { generateId } from '.'
import { NodotsGameCheckers } from './Checker'
import {
  Players,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'
import { Point } from './Checkercontainer'
import { PlayerBoard } from './Board'

import { Latitude, Longitude } from './Board'

export const buildQuadrant = (
  start: 1 | 7 | 13 | 19,
  latitude: Latitude,
  longitude: Longitude,
  players: Players,
  checkers: NodotsGameCheckers
): Quadrant => {
  const end = start + 6
  const points: Point[] = []

  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color
  const clockwiseCheckers = checkers[clockwiseColor]
  let usedClockwiseCheckers = 0

  const clockwiseBoard = players[clockwiseColor].board
  const counterclockwiseBoard = players[counterclockwiseColor].board
  const counterclockwiseCheckers = checkers[counterclockwiseColor]
  let usedCounterclockwiseCheckers = 0

  for (const positionLabel in clockwiseBoard) {
    const checkerCount = clockwiseBoard[positionLabel as keyof PlayerBoard]
    if (positionLabel !== 'bar') {
      const pointId = generateId()
      const position: number = parseInt(positionLabel)
      const counterclockwisePosition = 25 - position
      if (position >= start && position < end) {
        const pointCheckers = clockwiseCheckers.slice(
          usedClockwiseCheckers,
          checkerCount
        )
        usedClockwiseCheckers = usedClockwiseCheckers + checkerCount
        pointCheckers.map((checker) => (checker.locationId = pointId))
        const p: Point = {
          id: pointId,
          kind: 'point',
          position: {
            clockwise: position,
            counterclockwise: counterclockwisePosition,
          },
          longitude,
          latitude,
          checkers: pointCheckers,
        }
        points.push(p)
      }
    }
  }
  for (const positionLabel in counterclockwiseBoard) {
    const checkerCount =
      counterclockwiseBoard[positionLabel as keyof PlayerBoard]

    if (positionLabel !== 'bar') {
      const counterclockwisePosition: number = parseInt(positionLabel)
      const clockwisePosition = 25 - counterclockwisePosition
      if (clockwisePosition >= start && clockwisePosition < end) {
        const existingPoint = points.find(
          (p) => p.position.counterclockwise === counterclockwisePosition
        )
        const pointCheckers = counterclockwiseCheckers.slice(
          usedCounterclockwiseCheckers,
          checkerCount
        )

        if (!existingPoint) {
          throw new Error(
            `No point at counterclockwisePosition ${counterclockwisePosition}`
          )
        }
        usedCounterclockwiseCheckers =
          usedCounterclockwiseCheckers + checkerCount
        pointCheckers.map((checker) => (checker.locationId = existingPoint.id))

        if (existingPoint && pointCheckers.length) {
          existingPoint.checkers = pointCheckers
        }
      }
    }
  }

  return {
    latitude,
    longitude,
    points,
  }
}

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Quadrant {
  latitude: Latitude
  longitude: Longitude
  points: Point[]
}

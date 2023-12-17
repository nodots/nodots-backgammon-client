import { v4 as generateId } from 'uuid'
import { CheckerProp } from '../../../board/state/types/board'
import {
  Point,
  initialize as initializePoints,
} from '../../../point/state/types'

export enum QuadrantLocation {
  SE,
  SW,
  NE,
  NW,
}

/**
 * The Board is divided into 4 quadrants each with 6 Points. QuadrantLocation
 * is defined by map quadrants, e.g. "nw", "se". The two Quadrants on the side
 * of the Board where the Player "bears off", i.e., their Checkerbox of type Rail
 * have special rules.
 */
export type Quadrant = {
  id: string
  location: QuadrantLocation
  points: Point[]
}

export const isQuadrant = (v: any): v is Quadrant => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex((k) => k === 'id')
  if (idIndex === -1) {
    return false
  }

  const locationIndex = keys.findIndex((k) => k === 'location')
  if (locationIndex === -1) {
    return false
  }

  if (!(v.location in QuadrantLocation)) {
    return false
  }

  const pointIndex = keys.findIndex((k) => k === 'points')
  if (!pointIndex) {
    return false
  }

  if (v.points.length !== 6) {
    return false
  }

  return true
}

export const initialize = (setup: CheckerProp[]): Quadrant[] => {
  const quadrants: Quadrant[] = []
  const points = initializePoints(setup)

  quadrants[0] = {
    id: generateId(),
    location: QuadrantLocation.SE,
    points: points.filter(
      (p) => typeof p.position === 'number' && p.position <= 6
    ),
  }
  quadrants[1] = {
    id: generateId(),
    location: QuadrantLocation.SW,
    points: points.filter(
      (p) =>
        typeof p.position === 'number' && p.position >= 7 && p.position <= 12
    ),
  }
  quadrants[2] = {
    id: generateId(),
    location: QuadrantLocation.NW,
    points: points.filter(
      (p) =>
        typeof p.position === 'number' && p.position >= 13 && p.position <= 18
    ),
  }
  quadrants[3] = {
    id: generateId(),
    location: QuadrantLocation.NE,
    points: points.filter(
      (p) => typeof p.position === 'number' && p.position >= 19
    ),
  }

  return quadrants
}

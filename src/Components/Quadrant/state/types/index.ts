import { generateId, CheckerProp } from '../../../../models'
import { Point, initialize as initializePoints } from '../../../Point/state/types'

export enum QuadrantLocation {
  SE,
  SW,
  NE,
  NW
}

/**
 * The Board is divided into 4 quadrants each with 6 Points. QuadrantLocation 
 * is defined by map quadrants, e.g. "nw", "se". The two Quadrants on the side
 * of the Board where the Player "bears off", i.e., their CheckerBox of type Rail
 * have special rules.
 */
export type Quadrant = {
  id: string
  location: QuadrantLocation
  points: Point[]

}

export type Grid = {
  SE: Quadrant,
  SW: Quadrant,
  NW: Quadrant,
  NE: Quadrant
}

export const initialize = (setup: CheckerProp[]): Grid => {
  const points = initializePoints(setup)
  const grid: Grid = {
    SE: { id: generateId(), location: QuadrantLocation.SE, points: points.filter(p => typeof p.position === 'number' && p.position <= 6) },
    SW: { id: generateId(), location: QuadrantLocation.SW, points: points.filter(p => typeof p.position === 'number' && p.position >= 7 && p.position <= 12) },
    NW: { id: generateId(), location: QuadrantLocation.NW, points: points.filter(p => typeof p.position === 'number' && p.position >= 13 && p.position <= 18) },
    NE: { id: generateId(), location: QuadrantLocation.NE, points: points.filter(p => typeof p.position === 'number' && p.position >= 19) }

  }

  return grid
}


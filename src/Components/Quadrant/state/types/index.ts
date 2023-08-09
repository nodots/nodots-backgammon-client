import { generateId } from '../../../../game'
import { CheckerProp } from '../../../Board/state/types/board'
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

export const initialize = (setup: CheckerProp[]): Quadrant[] => {
  const quadrants: Quadrant[] = []
  const points = initializePoints(setup)

  quadrants[0] = { id: generateId(), location: QuadrantLocation.SE, points: points.filter(p => typeof p.position === 'number' && p.position <= 6) }
  quadrants[1] = { id: generateId(), location: QuadrantLocation.SW, points: points.filter(p => typeof p.position === 'number' && p.position >= 7 && p.position <= 12) }
  quadrants[2] = { id: generateId(), location: QuadrantLocation.NW, points: points.filter(p => typeof p.position === 'number' && p.position >= 13 && p.position <= 18) }
  quadrants[3] = { id: generateId(), location: QuadrantLocation.NE, points: points.filter(p => typeof p.position === 'number' && p.position >= 19) }

  return quadrants
}



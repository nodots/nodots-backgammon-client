import { QuadrantLocation, generateId } from '../../../../models'
import { Point } from '../../../Point/state/types'

/**
 * The Board is divided into 4 quadrants each with 6 Points. QuadrantLocation 
 * is defined by map quadrants, e.g. "nw", "se". The two Quadrants on the side
 * of the Board where the Player "bears off", i.e., their CheckerBox of type Rail
 * have special rules.
 */
export class Quadrant {
  id: string
  location: QuadrantLocation
  points: Point[]

  constructor ({ location, points }: { location: QuadrantLocation; points: Point[] }) {
    this.id = generateId()
    this.location = location
    this.points = points
  }

}
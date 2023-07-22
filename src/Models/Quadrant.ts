import { GameError } from './Error'
import { Checker } from './Checker'
import { Point } from './Point'
import { Color, PointProp, QuadrantLocation, generateId } from '.'

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

  getCheckersByColor (color: Color): Checker[] {
    const checkers: Checker[] = []
    this.points.forEach(p => {
      if (!p.checkers) {
        throw new GameError({ model: 'Quadrant', errorMessage: 'Checkers not initialized for point' })
      }
      checkers.push(...p.checkers.filter(c => c.color === color))
    })
    return checkers
  }

  // FIXME: currently returns a tuple. Should be an object to prevent ordering errors
  static initialize (setup: PointProp[]): Quadrant[] {
    const points = Point.initialize(setup)
    // Need the typeof filter since we are treating the rail (position = 'rail') and bear off trays (p.position = 'off') types of points
    const SEQuadrant = new Quadrant({ location: 'se', points: points.filter(p => typeof p.position === 'number' && p.position <= 6) })
    const SWQuadrant = new Quadrant({ location: 'sw', points: points.filter(p => typeof p.position === 'number' && p.position >= 7 && p.position <= 12) })
    const NWQuadrant = new Quadrant({ location: 'nw', points: points.filter(p => typeof p.position === 'number' && p.position >= 13 && p.position <= 18) })
    const NEQuadrant = new Quadrant({ location: 'ne', points: points.filter(p => typeof p.position === 'number' && p.position >= 19) })
    return [SEQuadrant, SWQuadrant, NEQuadrant, NWQuadrant]
  }
}
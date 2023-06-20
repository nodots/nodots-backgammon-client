import { Checker } from './Checker'
import { Point } from './Point'

import { Color, QuadrantLocation, generateId } from './Backgammon'

export class Quadrant {
  id: string
  location: QuadrantLocation
  points: Point[]

  constructor (location: QuadrantLocation, points: Point[]) {
    this.id = generateId()
    this.location = location
    this.points = points
  }

  getCheckersByColor (color: Color): Checker[] {
    // console.log(`getCheckersByColor ${color.toString()}`)
    const checkers: Checker[] = []
    this.points.forEach(p => {
      if (!p.checkers) {
        throw Error('Checkers not initialized for point')
      }
      checkers.push(...p.checkers.filter(c => c.color === color))
    })
    return checkers
  }

  static initialize (): Quadrant[] {
    const points = Point.initialize()
    const SEQuadrant = new Quadrant('se', points.filter(p => p.position <= 6))
    const SWQuadrant = new Quadrant('sw', points.filter(p => p.position >= 7 && p.position <= 12))
    const NWQuadrant = new Quadrant('nw', points.filter(p => p.position >= 13 && p.position <= 18))
    const NEQuadrant = new Quadrant('ne', points.filter(p => p.position >= 19))
    return [SEQuadrant, SWQuadrant, NEQuadrant, NWQuadrant]
  }

}
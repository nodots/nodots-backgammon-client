import { Color } from './Backgammon'
import { Point } from './Point'
import { Quadrant } from './Quadrant'
import { Checker } from './Checker'
import { Rail } from './Rail'

export class Board {
  rail: Rail
  quadrants: Quadrant[]
  points: Point[]
  initialize?: () => {}

  constructor (quadrants: Quadrant[]) {
    this.quadrants = quadrants
    this.rail = new Rail()
    this.points = [
      ...this.quadrants[0].points,
      ...this.quadrants[1].points,
      ...this.quadrants[2].points,
      ...this.quadrants[3].points,
    ]
  }

  private getPoints (): Point[] {
    const points: Point[] = []
    this.quadrants.forEach(q => {
      const ps = q.points
      points.push(...ps)
    })
    return points
  }

  getCheckersByColor (color: Color): Checker[] {
    // console.log(`getCheckersByColor ${color.toString()}`)
    const checkers: Checker[] = []
    this.quadrants.forEach(q => {
      checkers.push(...q.getCheckersByColor(color))
    })
    return checkers
  }

  static initialize (): Board {
    const quadrants = Quadrant.initialize()
    return new Board(quadrants)
  }


}

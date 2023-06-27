import { Color } from './Backgammon'
import { Point } from './Point'
import { Quadrant } from './Quadrant'
import { Checker } from './Checker'
import { Rail } from './Rail'
import { Off } from './Off'

export class Board {
  quadrants: Quadrant[]
  points: Point[]
  rail: Rail = new Rail()
  off: Off = new Off()

  initialize?: () => Board

  constructor (quadrants: Quadrant[]) {
    this.quadrants = quadrants

    this.points = [
      ...this.quadrants[0].points,
      ...this.quadrants[1].points,
      ...this.quadrants[2].points,
      ...this.quadrants[3].points,
    ]


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

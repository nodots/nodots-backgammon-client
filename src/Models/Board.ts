import { Color, INIT_BOARD_SETUP, PointProp, generateId } from './Backgammon'
import { Point } from './Point'
import { Quadrant } from './Quadrant'
import { Checker } from './Checker'
import { Rail } from './Rail'
import { Off } from './Off'

export class Board {
  id: string
  quadrants: Quadrant[]
  points: Point[]
  rail: Rail
  off: Off

  initialize?: () => Board

  private constructor (quadrants: Quadrant[], rail: Rail, off: Off) {
    this.id = generateId()
    this.quadrants = quadrants
    this.rail = rail
    this.off = off

    this.points = [
      ...this.quadrants[0].points,
      ...this.quadrants[1].points,
      ...this.quadrants[2].points,
      ...this.quadrants[3].points,
    ]
  }

  getCheckersByColor (color: Color): Checker[] {
    const checkers: Checker[] = []
    this.quadrants.forEach(q => {
      checkers.push(...q.getCheckersByColor(color))
    })
    return checkers
  }

  static initialize (setup?: PointProp[]): Board {
    if (!setup) {
      setup = INIT_BOARD_SETUP
    }
    const quadrants = Quadrant.initialize(setup)
    const rail = Rail.initialize(setup)
    const off = Off.initialize(setup)
    return new Board(quadrants, rail, off)
  }
}

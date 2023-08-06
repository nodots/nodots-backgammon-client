import { Color, INIT_BOARD_SETUP, CheckerProp, modelDebug, generateId } from '.'
import { CheckerBox } from './CheckerBox'
import { Point } from './Point'
import { Quadrant } from './Quadrant'
import { Checker } from './Checker'
import { Rail } from './Rail'
import { Off } from './Off'
import { RollSurface } from './RollSurface'

export class Board {
  id: string
  quadrants: Quadrant[]
  rollSurfaces: {
    white: RollSurface,
    black: RollSurface
  }
  points: Point[]
  rail: {
    white: Rail
    black: Rail
  }
  off: {
    white: Off,
    black: Off
  }

  private constructor (
    { quadrants, rail, off, rollSurfaces }:
      { quadrants: Quadrant[]; rail: { white: Rail, black: Rail }; off: { white: Off, black: Off }, rollSurfaces: { white: RollSurface, black: RollSurface } }) {
    this.id = generateId()
    this.quadrants = quadrants
    this.rail = rail
    this.off = off
    this.rollSurfaces = {
      white: rollSurfaces.white,
      black: rollSurfaces.black
    }

    this.points = [
      ...this.quadrants[0].points,
      ...this.quadrants[1].points,
      ...this.quadrants[2].points,
      ...this.quadrants[3].points,
    ]
  }

  getCheckerBoxes (): CheckerBox[] {
    const checkerboxes: CheckerBox[] = []
    checkerboxes.push(...this.points)
    checkerboxes.push(this.rail.black)
    checkerboxes.push(this.rail.white)
    checkerboxes.push(this.off.black)
    checkerboxes.push(this.off.white)
    return checkerboxes
  }

  getCheckersByColor (color: Color): Checker[] {
    const checkers: Checker[] = []
    this.points.forEach(p => {
      checkers.concat(p.checkers.filter(c => c.color === color))
    })

    return checkers
  }

  getPointContainer (pointId: string): Quadrant | undefined {
    if (!modelDebug) {
      console.log(`[BOARD MODEL] getting quadrant for ${pointId}`)
      const point = this.points.find(p => p.id === pointId)
      console.log(point)
    }
    const reducer = (quadrants: Quadrant[], pointId: string): Quadrant | undefined => {
      let quadrant: Quadrant | undefined = undefined
      quadrants.forEach(q => {
        q.points.forEach(p => {
          if (p.id === pointId) {
            quadrant = q
          }
        })
      })
      return quadrant
    }

    const quadrant = reducer(this.quadrants, pointId)
    return quadrant
  }

  static initialize (setup?: CheckerProp[]): Board {
    if (!setup) {
      setup = INIT_BOARD_SETUP
    }
    const quadrants = Quadrant.initialize(setup)
    const rail = Rail.initialize(setup)
    const off = Off.initialize(setup)
    const rollSurfaces = { black: new RollSurface('black'), white: new RollSurface('white') }

    return new Board({ quadrants, rail, off, rollSurfaces })
  }
}

import { Color, INIT_BOARD_SETUP, PointProp, modelDebug, generateId } from '.'
import { CheckerBox } from './CheckerBox'
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

  private constructor ({ quadrants, rail, off }: { quadrants: Quadrant[]; rail: Rail; off: Off }) {
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

  getCheckerBoxes (): CheckerBox[] {
    const checkerBoxes: CheckerBox[] = []
    this.points.forEach(p => checkerBoxes.push(p.checkerBox))
    checkerBoxes.push(this.rail.checkerBoxes.white)
    checkerBoxes.push(this.rail.checkerBoxes.black)
    checkerBoxes.push(this.off.checkerBoxes.white)
    checkerBoxes.push(this.off.checkerBoxes.black)
    return checkerBoxes
  }

  getCheckerBoxContainer (checkerBoxId: string): Point | undefined {
    const point: Point | undefined = this.points.find(p => checkerBoxId === p.checkerBox.id)
    return point
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

  static initialize (setup?: PointProp[]): Board {
    if (!setup) {
      setup = INIT_BOARD_SETUP
    }
    const quadrants = Quadrant.initialize(setup)
    const rail = Rail.initialize(setup)
    const off = Off.initialize(setup)
    return new Board({ quadrants, rail, off })
  }
}

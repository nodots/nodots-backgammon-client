import { Checker } from './Checker'
import { INIT_BOARD_SETUP, POINT_COUNT, generateId } from './Backgammon'

export type PointPosition = number | 'rail' | 'off'

export class Point {
  id: string
  position: PointPosition
  checkers?: Checker[]

  constructor (position: PointPosition, checkers?: Checker[]) {
    this.id = generateId()
    this.position = position
    if (checkers) {
      this.checkers = checkers
    }
  }

  addCheckers (checkers: Checker[]) {
    this.checkers?.push(...checkers)
  }

  static initialize (): Point[] {
    const points: Point[] = []

    for (let i = 0; i < POINT_COUNT; i++) {
      const position = i + 1
      const checkers: Checker[] = []
      const config = INIT_BOARD_SETUP.find(p => p.position === position)
      if (config) {
        for (let c = 0; c < config.checkerCount; c++) {
          checkers.push(new Checker(config.color))
        }
      }
      points.push(new Point(position, checkers))
    }
    return points
  }

}

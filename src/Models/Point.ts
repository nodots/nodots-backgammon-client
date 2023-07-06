import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'
import { POINT_COUNT, PointProp, generateId } from './Backgammon'

export class Point {
  id: string
  position: number
  checkerBox: CheckerBox
  checkers: Checker[] = []

  constructor (position: number, checkers?: Checker[]) {
    this.id = generateId()
    this.position = position
    this.checkerBox = new CheckerBox('point')
    this.checkers = this.checkerBox.checkers
  }

  static initialize (setup: PointProp[]): Point[] {
    const points: Point[] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const position = i + 1
      const point = new Point(position)
      const config = setup.find(p => p.position === position)
      if (config) {
        for (let i = 0; i < config.checkerCount; i++) {
          point.checkers.push(new Checker(config.color))
        }
      }

      points.push(point)
    }
    return points
  }
}

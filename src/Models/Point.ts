import { Checker } from './Checker'
import { CheckerContainer } from './CheckerContainer'
import { POINT_COUNT, generateId } from './Backgammon'

export class Point {
  id: string
  position: number
  checkerContainer: CheckerContainer
  checkers: Checker[] = []

  constructor (position: number) {
    this.id = generateId()
    this.position = position
    this.checkerContainer = new CheckerContainer('point')
    this.checkers = this.checkerContainer.checkers
  }

  static initialize (): Point[] {
    const points: Point[] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const position = i + 1
      const point = new Point(position)
      points.push(point)
    }
    return points
  }
}

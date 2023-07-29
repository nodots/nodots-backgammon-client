import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'
import { CheckerBoxType, POINT_COUNT, PointProp, generateId } from '.'

export class Point {
  id: string
  position: number
  checkerBox: CheckerBox
  checkers: Checker[] = []

  constructor ({ position, checkers }: { position: number; checkers?: Checker[] }) {
    this.id = generateId()
    this.position = position
    this.checkerBox = new CheckerBox({ type: CheckerBoxType.POINT, parent: this })
    this.checkers = this.checkerBox.checkers
  }

  static initialize (setup: PointProp[]): Point[] {
    const points: Point[] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const position = i + 1
      const point = new Point({ position })
      point.checkerBox.parent = point
      const config = setup.find(p => p.position === position)
      if (config) {
        for (let i = 0; i < config.checkerCount; i++) {
          point.checkers.push(new Checker(config.color, point.checkerBox))
        }
      }

      points.push(point)
    }
    return points
  }
}

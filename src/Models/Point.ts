import { Checker } from './Checker'
import { CheckerBox, ICheckerBox } from './CheckerBox'
import { POINT_COUNT, CheckerProp, Color, generateId } from '.'

export class Point extends CheckerBox {

  constructor (attrs: ICheckerBox) {
    const checkerBoxAttrs: ICheckerBox = {
      color: attrs.color,
      checkers: attrs.checkers,
      position: attrs.position
    }
    super(checkerBoxAttrs)
  }

  static initialize (setup: CheckerProp[]): Point[] {
    const points: Point[] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const position = i + 1
      const pointAttrs: ICheckerBox = {
        position,
      }
      const point = new Point(pointAttrs)
      const config = setup.find(p => p.position === position)
      if (config) {
        for (let i = 0; i < config.checkerCount; i++) {
          point.checkers.push(new Checker(config.color, point))
        }
      }

      points.push(point)
    }
    return points
  }
}

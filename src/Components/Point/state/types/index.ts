import { CheckerBoxPosition, CheckerProp, Color, POINT_COUNT, generateId } from '../../../../models'
import { Checker } from '../../../Checker/state/types'

export type Point = {
  id: string,
  color?: Color
  checkers: Checker[]
  position: CheckerBoxPosition
}

export const initialize = (setup: CheckerProp[]): Point[] => {
  const points: Point[] = []
  for (let i = 0; i < POINT_COUNT; i++) {
    const position = i + 1
    const point: Point = {
      id: generateId(),
      position,
      checkers: []
    }
    const config = setup.find(p => p.position === position)
    if (config) {
      for (let i = 0; i < config.checkerCount; i++) {
        // FIXME: bad cast
        point.checkers.push({ id: generateId(), color: config.color as Color })
      }
    }
    points.push(point)
  }
  return points
}

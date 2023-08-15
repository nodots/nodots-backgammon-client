import { Color, isColor, CheckerBoxPosition, generateId } from '../../../../game'
import { POINT_COUNT, CheckerProp } from '../../../Board/state/types/board'
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
        if (isColor(config.color)) {
          point.checkers.push({ id: generateId(), color: config.color })
          point.color = config.color
        }
      }
    }
    points.push(point)
  }
  return points
}

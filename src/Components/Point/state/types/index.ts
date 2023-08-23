import { Color, isColor, generateId } from '../../../../game'
import { POINT_COUNT, CheckerProp } from '../../../Board/state/types/board'
import { Checker } from '../../../Checker/state/types'


// FIXME: Either use the color attribute throughout the app or abandon
export type Point = {
  id: string,
  checkers: Checker[]
  position: number
  color?: Color
}

export const isPoint = (p: any): p is Point => {
  if (typeof p !== 'object') {
    return false
  }

  const keys = Object.keys(p)

  const idIndex = keys.findIndex(k => k === 'id')
  if (idIndex === -1) {
    return false
  }

  const checkersIndex = keys.findIndex(k => k === 'checkers')
  if (checkersIndex === -1) {
    return false
  }

  const positionIndex = keys.findIndex(k => k === 'position')
  if (positionIndex === -1) {
    return false
  }
  if (typeof positionIndex !== 'number') {
    return false
  }

  if (p.position < 0 || p.position > POINT_COUNT) {
    return false
  }

  return true
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
          if (config.checkerCount >= 2) {
            point.color = config.color
          }
        }
      }
    }
    points.push(point)
  }
  return points
}

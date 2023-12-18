import { v4 as generateId } from 'uuid'
import { Color } from '../../../../game'
import { POINT_COUNT } from '../../../Board/state/types'
import { Checker, CheckerProp } from '../../../Checker/state/types'

export type Point = {
  id: string
  checkers: Checker[]
  position: number
  positionClockwise: number
  positionCounterClockwise: number
  color?: Color
}

export const isPoint = (p: any): p is Point => {
  if (typeof p !== 'object') {
    return false
  }

  const keys = Object.keys(p)

  const idIndex = keys.findIndex((k) => k === 'id')
  if (idIndex === -1) {
    console.error(`No idIndex ${idIndex}`)
    return false
  }

  const checkersIndex = keys.findIndex((k) => k === 'checkers')
  if (checkersIndex === -1) {
    console.error('No checkersIndex')
    return false
  }

  const positionIndex = keys.findIndex((k) => k === 'position')
  if (positionIndex === -1) {
    console.error('No positionIndex')
    return false
  }
  if (typeof positionIndex !== 'number') {
    console.error(`${positionIndex} is not a number`)
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
      positionClockwise: 25 - position,
      positionCounterClockwise: position,
      checkers: [],
    }
    const config = setup.find((p) => p.position === position)
    if (config) {
      for (let i = 0; i < config.checkerCount; i++) {
        if (config.color) {
          point.checkers.push({
            id: generateId(),
            color: config.color as Color,
          })
          if (config.checkerCount >= 2) {
            point.color = config.color as Color
          }
        }
      }
    }
    points.push(point)
  }
  return points
}

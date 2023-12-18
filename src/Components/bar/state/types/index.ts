import { v4 as generateId } from 'uuid'
import { Color, CheckerboxPosition, isColor } from '../../../../game'
import { Checker, CheckerProp } from '../../../Checker/state/types'

export type Bar = {
  id: string
  color: Color
  checkers: Checker[]
  position: 'bar'
  positionClockwise: 'bar'
  positionCounterClockwise: 'bar'
}

export const isBar = (v: any): v is Bar => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex((k) => k === 'id')
  const checkersIndex = keys.findIndex((k) => k === 'checkers')
  const positionIndex = keys.findIndex((k) => k === 'position')
  const colorIndex = keys.findIndex((k) => k === 'color')
  if (
    idIndex === -1 ||
    checkersIndex === -1 ||
    positionIndex === -1 ||
    colorIndex === -1
  ) {
    return false
  }

  if (!isColor(v.color)) {
    return false
  }

  return true
}

export function initialize(setup: CheckerProp[]): { white: Bar; black: Bar } {
  const whiteCheckerSetup = setup.find(
    (cp) => cp.color === 'white' && cp.position === 'bar'
  )
  const whiteCheckers: Checker[] = []
  if (whiteCheckerSetup) {
    for (let i = 0; i < whiteCheckerSetup.checkerCount; i++) {
      whiteCheckers.push({ id: generateId(), color: 'white' })
    }
  }

  const blackCheckerSetup = setup.find(
    (cp) => cp.color === 'black' && cp.position === 'bar'
  )
  const blackCheckers: Checker[] = []
  if (blackCheckerSetup) {
    for (let i = 0; i < blackCheckerSetup.checkerCount; i++) {
      blackCheckers.push({ id: generateId(), color: 'black' })
    }
  }

  const white: Bar = {
    id: generateId(),
    color: 'white',
    position: 'bar',
    positionClockwise: 'bar',
    positionCounterClockwise: 'bar',
    checkers: whiteCheckers,
  }

  const black: Bar = {
    id: generateId(),
    color: 'black',
    position: 'bar',
    positionClockwise: 'bar',
    positionCounterClockwise: 'bar',
    checkers: blackCheckers,
  }

  return { white, black }
}

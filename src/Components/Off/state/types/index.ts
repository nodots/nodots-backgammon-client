import { Color, CheckerBoxPosition, isColor } from '../../../../game'
import { generateId } from '../../../../game/game'
import { Checker } from '../../../checker/state/types'
import { CheckerProp } from '../../../board/state/types/board'
import { v4 as uuid } from 'uuid'

export type Off = {
  id: string,
  color: Color,
  checkers: Checker[],
  position: CheckerBoxPosition
}

export const isOff = (v: any): v is Off => {

  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex(k => k === 'id')
  const checkersIndex = keys.findIndex(k => k === 'checkers')
  const positionIndex = keys.findIndex(k => k === 'position')
  const colorIndex = keys.findIndex(k => k === 'color')

  if (idIndex === -1 || checkersIndex === -1 || positionIndex === -1 || colorIndex === -1) {
    return false
  }

  if (!isColor(v.color)) {
    return false
  }

  return true
}

export const initialize = (setup: CheckerProp[]): { white: Off, black: Off } => {
  const whiteCheckerSetup = setup.find(cp => cp.color === 'white' && cp.position === 'off')
  const whiteCheckers: Checker[] = []
  if (whiteCheckerSetup) {
    for (let i = 0; i < whiteCheckerSetup.checkerCount; i++) {
      whiteCheckers.push({ id: generateId(), color: 'white' })
    }
  }

  const blackCheckerSetup = setup.find(cp => cp.color === 'black' && cp.position === 'off')
  const blackCheckers: Checker[] = []
  if (blackCheckerSetup) {
    for (let i = 0; i < blackCheckerSetup.checkerCount; i++) {
      blackCheckers.push({ id: generateId(), color: 'black' })
    }
  }

  const white: Off = {
    id: uuid(),
    color: 'white',
    position: 'off',
    checkers: whiteCheckers
  }

  const black: Off = {
    id: uuid(),
    color: 'black',
    position: 'off',
    checkers: blackCheckers
  }

  return { white, black }

}

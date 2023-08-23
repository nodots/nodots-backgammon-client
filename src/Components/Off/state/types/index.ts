import { CheckerBoxPosition } from '../../../../game/game'
import { Color } from '../../../../game'
import { generateId } from '../../../../game'
import { Checker } from '../../../Checker/state/types'
import { CheckerProp } from '../../../Board/state/types/board'

export type Off = {
  id: string,
  color: Color,
  checkers: Checker[],
  position: 'off'
}

export const isOff = (o: any): o is Off => {
  if (typeof o !== 'object') {
    return false
  }

  const keys = Object.keys(o)

  const positionIndex = keys.findIndex(k => k === 'position')
  if (positionIndex === -1) {
    return false
  }
  if (o.position !== 'off') {
    return false
  }


  return true
}

export interface OffContainer {
  white: Off,
  black: Off
}

export const initialize = (setup: CheckerProp[]): OffContainer => {
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

  const offContainer: OffContainer = {
    white: {
      id: generateId(),
      color: 'white',
      position: 'off',
      checkers: whiteCheckers
    },
    black: {
      id: generateId(),
      color: 'black',
      position: 'off',
      checkers: blackCheckers
    },

  }
  return offContainer
}
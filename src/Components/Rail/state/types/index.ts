import { Color, CheckerBoxPosition, generateId } from '../../../../game'
import { Checker } from '../../../Checker/state/types'
import { CheckerProp } from '../../../Board/state/types/board'

export type Rail = {
  id: string,
  color: Color,
  checkers: Checker[],
  position: CheckerBoxPosition
}

export interface RailContainer {
  white: Rail,
  black: Rail
}

export const initialize = (setup: CheckerProp[]): RailContainer => {
  const whiteCheckerSetup = setup.find(cp => cp.color === 'white' && cp.position === 'rail')
  const whiteCheckers: Checker[] = []
  if (whiteCheckerSetup) {
    for (let i = 0; i < whiteCheckerSetup.checkerCount; i++) {
      whiteCheckers.push({ id: generateId(), color: 'white' })
    }
  }

  const blackCheckerSetup = setup.find(cp => cp.color === 'black' && cp.position === 'rail')
  const blackCheckers: Checker[] = []
  if (blackCheckerSetup) {
    for (let i = 0; i < blackCheckerSetup.checkerCount; i++) {
      blackCheckers.push({ id: generateId(), color: 'black' })
    }
  }

  const railContainer: RailContainer = {
    white: {
      id: generateId(),
      color: 'white',
      position: 'rail',
      checkers: whiteCheckers
    },
    black: {
      id: generateId(),
      color: 'black',
      position: 'rail',
      checkers: blackCheckers
    },

  }
  return railContainer
}

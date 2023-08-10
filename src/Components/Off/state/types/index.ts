import { CheckerBoxPosition } from '../../../../game/game'
import { Color } from '../../../../game'
import { generateId } from '../../../../game'
import { Checker } from '../../../Checker/state/types'
import { CheckerProp } from '../../../Board/state/types/board'

export type Off = {
  id: string,
  color: Color,
  checkers: Checker[],
  position: CheckerBoxPosition
}

export interface OffContainer {
  white: Off,
  black: Off
}

export const initialize = (setup: CheckerProp[]): OffContainer => {
  const whiteCheckerSetup = setup.filter(cp => cp.color === 'white' && cp.position === 'off')
  const whiteCheckers: Checker[] = []
  whiteCheckerSetup.forEach(c => {
    whiteCheckers.push({ id: generateId(), color: 'white' })
  })

  const blackCheckerSetup = setup.filter(cp => cp.color === 'black' && cp.position === 'off')
  const blackCheckers: Checker[] = []
  blackCheckerSetup.forEach(c => {
    blackCheckers.push({ id: generateId(), color: 'black' })
  })


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
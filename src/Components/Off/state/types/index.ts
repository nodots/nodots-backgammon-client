import { CheckerBoxPosition, Color, CheckerProp, generateId } from '../../../../models'
import { Checker } from '../../../Checker/state/types'

export type Off = {
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
      color: 'white',
      position: 'off',
      checkers: whiteCheckers
    },
    black: {
      color: 'black',
      position: 'off',
      checkers: blackCheckers
    },

  }
  return offContainer
}
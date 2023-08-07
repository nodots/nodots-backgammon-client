import { CheckerBoxPosition, Color, CheckerProp, generateId } from '../../../../models'
import { Checker } from '../../../Checker/state/types'

export type Rail = {
  color: Color,
  checkers: Checker[],
  position: CheckerBoxPosition

}

export interface RailContainer {
  white: Rail,
  black: Rail
}

export const initialize = (setup: CheckerProp[]): RailContainer => {
  const whiteCheckerSetup = setup.filter(cp => cp.color === 'white' && cp.position === 'rail')
  const whiteCheckers: Checker[] = []
  whiteCheckerSetup.forEach(c => {
    whiteCheckers.push({ id: generateId(), color: 'white' })
  })

  const blackCheckerSetup = setup.filter(cp => cp.color === 'black' && cp.position === 'rail')
  const blackCheckers: Checker[] = []
  blackCheckerSetup.forEach(c => {
    blackCheckers.push({ id: generateId(), color: 'black' })
  })


  const railContainer: RailContainer = {
    white: {
      color: 'white',
      position: 'rail',
      checkers: whiteCheckers
    },
    black: {
      color: 'black',
      position: 'rail',
      checkers: blackCheckers
    },

  }
  return railContainer
}

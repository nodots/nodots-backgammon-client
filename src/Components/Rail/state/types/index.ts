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

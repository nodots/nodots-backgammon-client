import { DiePair } from './types'

export const initDiceState: Dice = initializeDice()

export type Dice = {
  white: DiePair,
  black: DiePair
}

function initializeDice () {
  const white: DiePair = { dice: [{ color: 'white', order: 0 }, { color: 'white', order: 1 }] }
  const black: DiePair = { dice: [{ color: 'black', order: 0 }, { color: 'black', order: 1 }] }

  return { white, black }
}


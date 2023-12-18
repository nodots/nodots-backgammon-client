import { GameDice } from './types/dice'
import { DiePair } from './types/dice'

export const initDiceState: GameDice = initializeDice()

function initializeDice() {
  const white: DiePair = {
    dice: [
      { color: 'white', order: 0 },
      { color: 'white', order: 1 },
    ],
  }
  const black: DiePair = {
    dice: [
      { color: 'black', order: 0 },
      { color: 'black', order: 1 },
    ],
  }

  return { white, black }
}

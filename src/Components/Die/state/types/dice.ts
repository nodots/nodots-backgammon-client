import { Die, DieValue } from './die'

export type Roll = [DieValue, DieValue]

export type DiePair = {
  dice: [Die, Die]
}

export type GameDice = {
  white: DiePair
  black: DiePair
}

export const isDiePair = (v: any): v is DiePair => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const diceIndex = keys.findIndex((k) => k === 'dice')
  if (diceIndex === -1) {
    return false
  }

  return true
}

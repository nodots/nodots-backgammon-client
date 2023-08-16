import { Die, DieValue } from './die'

export type Roll = [DieValue, DieValue]

export type DiePair = {
  dice: [Die, Die]
}

export const isDiePair = (v: any): v is DiePair => {
  if (typeof v !== 'object') {
    return false
  }
  const keys = Object.keys(v)
  const idIndex = keys.findIndex(k => k === 'dice')
  if (idIndex === -1) {
    return false
  }

  return true
}

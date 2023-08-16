import { Die, DieValue } from './die'

export type Roll = [DieValue, DieValue]

export type DiePair = {
  dice: [Die, Die]
}

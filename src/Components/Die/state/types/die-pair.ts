import { Die, DieValue } from './die'

export type DiePair = {
  dice: [Die, Die]
  roll?: () => [DieValue, DieValue]
}

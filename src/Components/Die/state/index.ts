import { Dice, initDiceState } from './dice.state'
import { SetDiceValuesPayload } from './dice.context'
import { DICE_ACTION_TYPE, reducer } from './reducers'
import { roll, DieValue, DieOrder } from './types'

export {
  initDiceState,
  DICE_ACTION_TYPE,
  reducer,
  roll
}

export type {
  Dice, SetDiceValuesPayload, DieValue,
  DieOrder,
}
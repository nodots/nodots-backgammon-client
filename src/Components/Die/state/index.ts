import { Dice, initDiceState } from './dice.state'
import { SetDiceValuesPayload } from './dice.context'
import { DICE_ACTION_TYPE, reducer } from './reducers'
import { roll, Roll, DieValue, DieOrder } from './types'

export {
  initDiceState,
  DICE_ACTION_TYPE,
  reducer,
  roll
}

export type {
  Roll,
  Dice, SetDiceValuesPayload, DieValue,
  DieOrder,
}
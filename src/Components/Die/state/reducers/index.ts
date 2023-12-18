import { produce } from 'immer'
import { Dice } from '../types/die-pair'
import { isDieValue } from '../types/die'
import { SetDiceValuesPayload } from '../dice.context'

export enum DICE_ACTION_TYPE {
  SET_DICE_VALUES,
}

export interface DiceAction {
  type: DICE_ACTION_TYPE
  payload: SetDiceValuesPayload
}

export const reducer = (state: Dice, action: DiceAction): Dice => {
  const {
    payload: {
      color,
      values: { die1, die2 },
    },
  } = action
  const newState = produce(state, (draft) => {
    if (isDieValue(die1) && isDieValue(die2)) {
      draft[color].dice[0].value = die1
      draft[color].dice[1].value = die2
    }
  })
  return newState
}

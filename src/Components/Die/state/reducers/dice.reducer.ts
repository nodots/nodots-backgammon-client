import { produce } from 'immer'
import { Dice } from '../dice.state'
import { DICE_ACTION_TYPE } from '../dice.state'
import { SetDiceValuesPayload } from '../dice.context'
import { isDieValue } from '../types/'
interface DiceAction {
  type: DICE_ACTION_TYPE,
  payload: SetDiceValuesPayload
}

const reducer = (state: Dice, action: DiceAction): Dice => {
  console.log(`[Dice Reducer]: state`, state)
  console.log(`[Dice Reducer]: action`, action)
  const { payload } = action
  const color = payload.color
  const newState = produce(state, draft => {
    if (isDieValue(payload.values.die1)) {
      draft[color].dice[0].value = payload.values.die1
      draft[color].dice[1].value = payload.values.die2
    }
  })
  return newState
}

export default reducer
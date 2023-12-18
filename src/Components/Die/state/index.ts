import { initDiceState } from './dice.state'
import { SetDiceValuesPayload } from './dice.context'
import { DICE_ACTION_TYPE, reducer } from './reducers'
import { GameDice, Roll } from './types/dice'
import { roll, DieValue, DieOrder } from './types/die'

export { initDiceState, DICE_ACTION_TYPE, reducer, roll }

export type { Roll, GameDice as Dice, SetDiceValuesPayload, DieValue, DieOrder }

import { reducer } from './reducers'
import { Color } from '../../../game/Types'
import { createContext, useCallback, useReducer } from 'react'
import { DICE_ACTION_TYPE } from './reducers'
import { initDiceState, Dice } from './dice.state'
import { DieValue } from './types'

export interface SetDiceValuesPayload {
  color: Color
  values: {
    die1: DieValue
    die2: DieValue
  }
}

export const useDiceContext = (initialState: Dice) => {
  const [dice, dispatch] = useReducer(reducer, initialState)

  const setDiceValues = useCallback(
    (payload: SetDiceValuesPayload) =>
      dispatch({ type: DICE_ACTION_TYPE.SET_DICE_VALUES, payload }),
    []
  )
  return { dice, setDiceValues }
}

type UseDiceContextType = ReturnType<typeof useDiceContext>

const initContextState: UseDiceContextType = {
  dice: initDiceState,
  setDiceValues() {},
}

export const DiceContext = createContext<UseDiceContextType>(initContextState)

import { useContext } from 'react'
import { DiePair } from './types'
import { DiceContext } from './dice.context'

import { SetDiceValuesPayload } from './dice.context'

type UseDiceHookType = {
  dice: {
    white: DiePair,
    black: DiePair,
  }
  setDiceValues: (values: SetDiceValuesPayload) => void
}

export const useDice = (): UseDiceHookType => {
  const { dice, setDiceValues } = useContext(DiceContext)
  return { dice, setDiceValues }
}
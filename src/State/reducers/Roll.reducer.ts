import { produce } from 'immer'
import { Color, DieValue, } from '../../Models'
import { GameState } from '../types/game-state'
import { GameAction } from '../types/game-action'
import { DieOrder } from '../types/die-state'

type DieRollAction = {
  color: Color,
  order: DieOrder,
  value: DieValue
}

export const reducer = (state: GameState, action: GameAction): GameState => {
  let newState = state

  // FIXME
  const rollAction = action.payload.payload as unknown as DieRollAction
  console.log(rollAction)

  newState = produce(state, draft => {
    draft.dice[rollAction.color][rollAction.order].value = rollAction.value
  })
  console.log(newState.dice[state.activeColor][rollAction.order])
  return newState
}

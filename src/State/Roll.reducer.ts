import { produce } from 'immer'
import { GameError, Color, Die } from '../Models'
import { GameState, GameAction } from './Game.State'

export const reducer = (state: GameState, action: GameAction): GameState => {
  const { payload } = action
  let newState: GameState = state

  if (state.debug.isActive && state.debug.components.die) {
    console.log('[Roll Reducer] ROLL')
  }
  if (!state.activeColor) {
    throw new GameError({ model: 'Game', errorMessage: 'fooobar' })
  }
  newState = produce(state, draft => {
    const payloadColor = payload.color as Color
    if (state.debug.isActive && state.debug.components.die) {
      console.log(`[Game Reducer] ROLL state.dice[${payloadColor}, ${payload.order}]:`, state.dice[payloadColor][payload.order])
    }
    draft.dice[payloadColor][payload.order].value = Die.roll()
  })
  if (state.debug.isActive && state.debug.components.die) {
    console.log('[Game Reducer] newState dice', newState.dice)
  }
  return newState
}
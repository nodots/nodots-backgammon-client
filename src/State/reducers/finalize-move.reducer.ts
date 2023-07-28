import { produce } from 'immer'
import { GameError } from '../../models'
import { GameState } from '../types/game-state'
import { GameAction } from '../types/game-action'

export const reducer = (state: GameState, action: GameAction): GameState => {
  let newState: GameState = state


  if (state.debug.isActive) {
    console.log('[Game Reducer] FINALIZE_MOVE')
  }

  newState = produce(state, draft => {
    if (state.activeColor === 'black') {
      draft.activeColor = 'white'
      draft.players.white.active = true
    } else if (state.activeColor === 'white') {
      draft.activeColor = 'black'
      draft.players.black.active = true
    } else {
      throw new GameError({ model: 'Player', errorMessage: 'There is no active player' })
    }
    draft.activeMove.moves = []
    draft.dice[state.activeColor][0].value = undefined


  })
  if (state.debug.isActive) {
    console.log('[Game Reducer] FINALIZE_MOVE newState:', newState)
  }

  return newState
}
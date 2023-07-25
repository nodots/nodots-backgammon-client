import { produce } from 'immer'
import { GameError } from '../../Models'
import { GameState } from '../types/GameState'
import { GameAction } from '../types/GameAction'

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
    draft.activeMove.checkers[0].origin = undefined
    draft.activeMove.checkers[0].destination = undefined
    draft.activeMove.checkers[1].origin = undefined
    draft.activeMove.checkers[1].destination = undefined
    draft.dice[state.activeColor][0].value = undefined


  })
  if (state.debug.isActive) {
    console.log('[Game Reducer] FINALIZE_MOVE newState:', newState)
  }

  return newState
}
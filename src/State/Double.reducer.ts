import { produce } from 'immer'
import { Cube } from '../Models'
import { GameState, GameAction } from './Game.State'

export const reducer = (state: GameState, action: GameAction): GameState => {
  let newState: GameState = state

  newState = produce(state, draft => {
    console.log(`[Game Reducer] DOUBLE state:`, state.cube)
    console.log(`[Game Reducer] DOUBLE draft:`, draft.cube)
    draft.cube.value = Cube.double(state.cube.value)
  })
  return newState
}

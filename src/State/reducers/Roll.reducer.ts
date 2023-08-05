import { produce } from 'immer'
import { Color, GameError } from '../../models'
import { GameState } from '../types/game.state'
import { GameAction, DieRollActionPayload } from '../types/game.action'

export const reducer = (state: GameState, action: GameAction): GameState => {
  let newState = state

  const rollAction = action.payload as DieRollActionPayload
  const rollColor = rollAction.color as Color

  newState = produce(state, draft => {
    if (!rollColor) {
      console.log('[MOVEREDUCERTHING] ROLLREDUCERTHING rollAction', rollAction)
      console.error('[MOVEREDUCERTHING] ROLLREDUCERTHING rollColor', rollColor)
      throw new GameError({ model: 'Roll', errorMessage: 'No rollColor' })
    }
    // const activePlayer = state.players[rollColor]
    // if (!activePlayer) {
    //   throw new GameError({ model: 'Roll', errorMessage: 'No activePlayer' })
    // }
    // if (!state.activeTurn.status) {
    //   const turn = new Turn(activePlayer
    // } 

  })
  return newState
}
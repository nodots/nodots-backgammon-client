import { produce } from 'immer'
import { Color, GameError } from '../../models'
import { GameState } from '../types/game.state'
import { MOVE_STATUS } from '../Game.state'
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
    draft.dice[rollColor][rollAction.order].value = rollAction.value
    draft.activeMove.color = rollColor
    draft.activeMove.status = MOVE_STATUS.INITIALIZED
    draft.activeMove.moves[rollAction.order] = {
      // If player rolls doubles we have more moves than dice
      dieValue: rollAction.value,
      origin: undefined,
      destination: undefined,
      completed: false
    }
  })
  return newState
}
import { GameError } from '../../models'
import { GameState } from '../types/game.state'
import { GAME_ACTION_TYPE } from '../game.state'
import { GameAction, InitializeTurnAction } from '../types/game.action'
import { reducer as rollReducer } from './roll.reducer'
import { reducer as moveReducer } from './move.reducer'
import { reducer as initializeTurnReducer } from './initialize-turn.reducer'
import { reducer as finalizeTurnReducer } from './finalize-turn.reducer'

export const reducer = (state: GameState, action: GameAction | InitializeTurnAction): GameState => {
  const { type } = action

  switch (type) {
    case GAME_ACTION_TYPE.MOVE:
      return moveReducer(state, action)
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      initializeTurnReducer(state, action)
      return state
    case GAME_ACTION_TYPE.FINALIZE_TURN:
      return finalizeTurnReducer(state, action)
    default:
      throw new GameError({ model: 'Game', errorMessage: `Unkown action type ${type}` })
  }
}

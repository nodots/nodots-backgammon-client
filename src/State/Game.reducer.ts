import { GameError } from '../Models'
import { GameState, GameAction, GAME_ACTION_TYPE } from './Game.State'
import { reducer as rollReducer } from './Roll.reducer'
import { reducer as moveReducer } from './Move.reducer'
import { reducer as finalizeMoveReducer } from './FinalizeMove.reducer'
import { reducer as doubleReducer } from './Double.reducer'

export const reducer = (state: GameState, action: GameAction): GameState => {
  const { type } = action

  switch (type) {
    case GAME_ACTION_TYPE.ROLL:
      return rollReducer(state, action)
    case GAME_ACTION_TYPE.MOVE:
      return moveReducer(state, action)
    case GAME_ACTION_TYPE.FINALIZE_MOVE:
      return finalizeMoveReducer(state, action)
    case GAME_ACTION_TYPE.DOUBLE:
      return doubleReducer(state, action)
    default:
      throw new GameError({ model: 'Game', errorMessage: `Unkown action type ${type}` })
  }
}

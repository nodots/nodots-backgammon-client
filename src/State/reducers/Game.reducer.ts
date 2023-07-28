import { GameError } from '../../models'
import { GAME_ACTION_TYPE } from '../Game.State'
import { GameState } from '../types/game-state'
import { GameAction } from '../types/game-action'
import { reducer as rollReducer } from './roll.reducer'
import { reducer as moveReducer } from './move.reducer'
import { reducer as finalizeMoveReducer } from './finalize-move.reducer'
import { reducer as doubleReducer } from './double.reducer'

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

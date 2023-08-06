import { produce } from 'immer'
import { GameError, Turn, isDieValue } from '../../models'
import { GameState } from '../types/game.state'
import { InitializeTurnAction } from '../types/game.action'
import { Roll } from '../../models/Turn'

export const reducer = (state: GameState, action: InitializeTurnAction): GameState => {
  const { payload } = action

  if (!payload || !payload.player) {
    throw new GameError({ model: 'Turn', errorMessage: 'Incorrect action type' })
  }

  return state
}
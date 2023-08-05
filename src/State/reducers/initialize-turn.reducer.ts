import { produce } from 'immer'
import { DieValue, GameError, Turn, isDieValue } from '../../models'
import { GameState } from '../types/game.state'
import { InitializeTurnAction } from '../types/game.action'
import { Roll } from '../../models/Turn'

export const reducer = (state: GameState, action: InitializeTurnAction): GameState => {
  const { payload } = action

  if (!payload || !payload.player) {
    throw new GameError({ model: 'Turn', errorMessage: 'Incorrect action type' })
  }



  const newState = produce(state, draft => {
    if (!state.dice[payload.player.color][0].value || !state.dice[payload.player.color][1].value) {
      throw new GameError({ model: 'Turn', errorMessage: 'No dice' })
    }
    const die1Value = state.dice[payload.player.color][0].value
    const die2Value = state.dice[payload.player.color][1].value
    if (!isDieValue(die1Value) || !isDieValue(die2Value)) {
      throw new GameError({ model: 'Turn', errorMessage: 'Invalid value for one or more dice' })
    }
    const roll: Roll = [die1Value, die2Value]
    const turn = new Turn(payload.player, roll)
    draft.activeTurn = turn
  })

  return newState
}
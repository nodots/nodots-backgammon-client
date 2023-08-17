import { produce } from 'immer'
import { generateId } from '.'
import { GameError } from '.'
import { Board } from '../components/Board/state'
import { Player, Turn, TurnStatus, initializeMoves } from '../components/Player/state/types'
import { Roll } from '../components/Die/state/types'
import { GAME_ACTION_TYPE } from './game.reducer'

// import { CUBE_ACTION_TYPE } from '../cube.state'
// import { SetCubeValuePayload } from '../cube.context'

export interface TurnActionPayload {
  board: Board,
  player: Player,
  roll: Roll,
  status: TurnStatus
}

export interface TurnAction {
  type: GAME_ACTION_TYPE
  payload: TurnActionPayload
}

export const reducer = (state: Turn, action: TurnAction): Turn => {
  const { type, payload } = action
  console.log(`[Turn Reducer]: state`, state)
  console.log(`[Turn Reducer]: type`, type)
  console.log(`[Turn Reducer]: payload`, payload)

  switch (type) {
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      console.log('TURN_ACTION_TYPE.INITIALIZE_TURN')
      return produce(state, draft => {
        if (!payload.board) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Missing board for Turn'
          })
        }
        draft.id = generateId()
        draft.player = payload.player
        draft.roll = payload.roll
        draft.status = TurnStatus.INITIALIZED
        draft.moves = initializeMoves(payload.board, payload.roll, payload.player)
      })
    default:
      throw new Error('Unknown turn action')
  }
}
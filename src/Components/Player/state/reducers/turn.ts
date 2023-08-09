import { produce } from 'immer'
import { generateId } from '../../../../models'
import { Player, Turn, TurnStatus, initializeMoves } from '../types'
import { Roll } from '../../../Die/state/types'
import { GAME_ACTION_TYPE } from '../../../../game.reducer'

// import { CUBE_ACTION_TYPE } from '../cube.state'
// import { SetCubeValuePayload } from '../cube.context'

export interface TurnActionPayload {
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
        draft.id = generateId()
        draft.player = payload.player
        draft.roll = payload.roll
        draft.status = TurnStatus.INITIALIZED
        draft.moves = initializeMoves(payload.roll)
      })
    default:
      throw new Error('Unknown turn action')
  }
}
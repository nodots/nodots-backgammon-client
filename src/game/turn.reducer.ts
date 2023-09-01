import { produce } from 'immer'
import { generateId } from '.'
import { GameError } from '.'
import { Board } from '../components/Board/state'
import { Player } from '../components/Player/state/types'
import { InitializeTurnAction, Turn, TurnStatus, initializeMoves } from './turn'
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
  // console.log(`[Turn Reducer]: state`, state)
  // console.log(`[Turn Reducer]: type`, type)
  // console.log(`[Turn Reducer]: payload`, payload)

  const initializeMovesPayload: InitializeTurnAction = {
    board: payload.board,
    player: payload.player,
    roll: payload.roll
  }

  const moves = initializeMoves(initializeMovesPayload)

  switch (type) {
    case GAME_ACTION_TYPE.INITIALIZE_TURN:
      return produce(state, draft => {
        if (!payload.board) {
          throw new GameError({
            model: 'Turn',
            errorMessage: 'Missing board for Turn'
          })
        }

        draft.id = generateId()
        draft.board = payload.board
        draft.player = payload.player
        draft.roll = payload.roll
        draft.moves = moves
        draft.status = TurnStatus.INITIALIZED
      })
    default:
      throw new Error('Unknown turn action')
  }
}
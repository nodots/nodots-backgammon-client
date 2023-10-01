import { v4 as generateId } from 'uuid'
import { produce } from 'immer'
import { Analytics, InitializeTurnAction, Turn, TurnStatus, initializeMoves } from './turn'
import { GameError } from '.'
import { Board } from '../components/board/state'
import { Player } from '../components/player/state'
import { Roll } from '../components/die/state'
import { GAME_ACTION_TYPE } from './game.reducer'

export interface TurnActionPayload {
  board: Board,
  player: Player,
  roll: Roll,
  status: TurnStatus,
  analytics: Analytics[],
  isAutomove: boolean
}

export interface TurnAction {
  type: GAME_ACTION_TYPE
  payload: TurnActionPayload
}

export const reducer = (state: Turn, action: TurnAction): Turn => {
  const { type, payload } = action

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
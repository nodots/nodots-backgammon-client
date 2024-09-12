import { GameActionTypes, GameActions } from './GameContextActions'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import { startGame, StartGamePayload } from './GameContextHelpers'

export type State = {
  game: NodotsGame
}

export const initialState: State = {
  game: {} as NodotsGame,
}

export function reducer(state: State, action: GameActions) {
  switch (action.type) {
    case GameActionTypes.START_GAME:
      const payload: StartGamePayload = {
        playerIds: [
          action.payload.players.black.id,
          action.payload.players.white.id,
        ],
      }
      startGame(payload)
      return {
        ...state,
        game: action.payload,
      }

    default:
      return state
  }
}

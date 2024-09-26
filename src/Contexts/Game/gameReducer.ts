import {
  NodotsGameInitializing,
  NodotsGameReady,
} from '../../../nodots_modules/backgammon-types'

export type GameState = {
  game: NodotsGameInitializing | NodotsGameReady
}

export const initialGameState: NodotsGameInitializing = {
  kind: 'initializing',
  players: {
    white: {
      id: '',
      kind: 'ready',
      activity: 'waiting',
      email: '',
      source: '',
      externalId: '',
      isLoggedIn: true,
      isSeekingGame: true,
      preferences: {},
    },
    black: {
      id: '',
      kind: 'ready',
      activity: 'waiting',
      email: '',
      source: '',
      externalId: '',
      isLoggedIn: true,
      isSeekingGame: true,
      preferences: {},
    },
  },
}

export function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, game: action.payload }
    default:
      return state
  }
}

import {
  NodotsGame,
  NodotsGameInitializing,
  NodotsGameReady,
  NodotsGameRolling,
  NodotsGameRollingForStart,
} from '../../../nodots_modules/backgammon-types'

export type GameState = {
  game: NodotsGame
}

export const initialGameState: NodotsGameInitializing = {
  kind: 'initializing',
  players: {
    white: {
      player: {
        id: '0',
        kind: 'ready',
        email: '',
        source: '',
        externalId: '',
        isLoggedIn: true,
        isSeekingGame: false,
      },
      attributes: {
        color: 'white',
        direction: 'counterclockwise',
        pipCount: 167,
      },
    },
    black: {
      player: {
        id: '0',
        kind: 'ready',
        email: '',
        source: '',
        externalId: '',
        isLoggedIn: true,
        isSeekingGame: false,
      },
      attributes: {
        color: 'black',
        direction: 'clockwise',
        pipCount: 167,
      },
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

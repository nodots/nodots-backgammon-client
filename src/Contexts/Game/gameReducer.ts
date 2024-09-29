import {
  NodotsGameInitializing,
  NodotsGameMoving,
  NodotsGameReady,
  NodotsGameRolling,
  NodotsGameRollingForStart,
} from '../../../nodots_modules/backgammon-types'

export type GameState = {
  game:
    | NodotsGameInitializing
    | NodotsGameReady
    | NodotsGameRollingForStart
    | NodotsGameRolling
    | NodotsGameMoving
}

export const initialGameState: NodotsGameInitializing = {
  kind: 'initializing',
  players: {
    white: {
      player: {
        id: '',
        kind: 'ready',
        email: '',
        source: '',
        externalId: '',
        isLoggedIn: true,
        isSeekingGame: true,
        preferences: {},
      },
      attributes: {
        color: 'white',
        pipCount: 167,
        direction: 'clockwise',
      },
    },
    black: {
      player: {
        id: '',
        kind: 'ready',
        email: '',
        source: '',
        externalId: '',
        isLoggedIn: true,
        isSeekingGame: true,
        preferences: {},
      },
      attributes: {
        color: 'black',
        pipCount: 167,
        direction: 'counterclockwise',
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

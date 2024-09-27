import {
  NodotsPlayerInitializing,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
} from '../../../nodots_modules/backgammon-types'

export type PlayerState = {
  player: NodotsPlayerInitializing | NodotsPlayerReady | NodotsPlayerPlaying
}

export const initialPlayerState: NodotsPlayerInitializing = {
  kind: 'initializing',
  email: '',
  source: '',
  externalId: '',
  isLoggedIn: false,
  preferences: {},
}

export function playerReducer(state: PlayerState, action: any): PlayerState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload }
    default:
      return state
  }
}

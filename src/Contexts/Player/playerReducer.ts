import { Player } from '../../../nodots_modules/backgammon-types'

export type PlayerState = {
  player: Player
}

export const initialPlayerState: PlayerState = {
  player: {
    id: '',
    kind: 'player-initializing',
    email: '',
    source: '',
    externalId: '',
    isLoggedIn: false,
  },
}

export function playerReducer(state: PlayerState, action: any): PlayerState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload }
    default:
      return state
  }
}

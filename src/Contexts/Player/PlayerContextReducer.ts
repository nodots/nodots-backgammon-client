import { PlayerActionTypes, PlayerActions } from './PlayerContextActions'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'

export type State = {
  player: NodotsPlayer
}

export const initialState: State = {
  player: {} as NodotsPlayer,
}

export function reducer(state: State, action: PlayerActions) {
  switch (action.type) {
    case PlayerActionTypes.SET_PLAYER:
      // Return a new state with the players array updated
      return {
        ...state,
        player: action.payload,
      }

    case PlayerActionTypes.LOGIN_PLAYER: {
      // Create a copy of the current state
      const stateCopy = { ...state }

      // Find the player to be liked
      const player = stateCopy.player
      // Ensure the player exists
      if (!player) {
        throw new Error('Player not found. Cannot login player.')
      }

      // Mark the player as liked
      player.isLoggedIn = true

      // Return the updated state
      return stateCopy
    }

    case PlayerActionTypes.LOGOUT_PLAYER: {
      // Create a copy of the current state
      const stateCopy = { ...state }

      // Find the player to be liked
      const player = stateCopy.player
      // Ensure the player exists
      if (!player) {
        throw new Error('Player not found. Cannot login player.')
      }

      // Mark the player as liked
      player.isLoggedIn = false

      // Return the updated state
      return stateCopy
    }

    default:
      return state
  }
}

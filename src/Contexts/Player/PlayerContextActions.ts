import {
  NodotsPlayer,
  PlayerPlaying,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'
// import { setPlayerSeekingGame } from './PlayerContextHelpers'

// Define action types as an enum to ensure consistency and prevent typos
export enum PlayerActionTypes {
  SET_PLAYER = 'SET_PLAYER',
  LOGIN_PLAYER = 'LOGIN_PLAYER',
  LOGOUT_PLAYER = 'LOGOUT_PLAYER',
  SET_PLAYER_PLAYING = 'SET_PLAYER_PLAYING',
}

// Define type for each action type to enforce type safety
export type SetPlayerAction = {
  type: PlayerActionTypes.SET_PLAYER
  payload: NodotsPlayer
}
// Define action type for changing player kind
export type SetPlayerPlayingAction = {
  type: PlayerActionTypes.SET_PLAYER_PLAYING
  payload: {
    playerId: string
  }
}

const setPlayerPlaying = async (playerId: string): Promise<PlayerPlaying> => {
  const playerPlaying = await fetch(`${apiUrl}/player/${playerId}/playing`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return playerPlaying.json()
}

// Action creator function for setting the player
export const playerActionSetPlayerPlaying = async (
  player: NodotsPlayer
): Promise<SetPlayerAction> => {
  console.log(
    '[PlayerContextActions] playerActionSetSeekingGame player:',
    player
  )

  const playerPlaying = await setPlayerPlaying(player.id)
  return {
    type: PlayerActionTypes.SET_PLAYER,
    payload: playerPlaying,
  }
}

export type LoginPlayerAction = {
  type: PlayerActionTypes.LOGIN_PLAYER
  payload: NodotsPlayer
}

export type LogoutPlayerAction = {
  type: PlayerActionTypes.LOGOUT_PLAYER
  payload: NodotsPlayer
}

// Define a union type Actions to represent all possible action types
export type PlayerActions =
  | SetPlayerAction
  | LoginPlayerAction
  | LogoutPlayerAction
  | SetPlayerPlayingAction

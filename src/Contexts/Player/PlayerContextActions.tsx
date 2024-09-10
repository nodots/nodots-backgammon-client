import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'
import { setPlayerSeekingGame } from './PlayerContextHelpers'

// Define action types as an enum to ensure consistency and prevent typos
export enum PlayerActionTypes {
  SET_PLAYER = 'SET_PLAYER',
  LOGIN_PLAYER = 'LOGIN_PLAYER',
  LOGOUT_PLAYER = 'LOGOUT_PLAYER',
}

// Define type for each action type to enforce type safety
export type SetPlayerAction = {
  type: PlayerActionTypes.SET_PLAYER
  payload: NodotsPlayer
}

// Action creator function for setting the player
export const playerActionSetSeekingGame = async (
  player: NodotsPlayer,
  seekingGame: boolean
): Promise<SetPlayerAction> => {
  console.log(
    '[PlayerContextActions] playerActionSetSeekingGame player:',
    player
  )
  console.log(
    '[PlayerContextActions] playerActionSetSeekingGame seekingGame:',
    seekingGame
  )
  await setPlayerSeekingGame(player.id, seekingGame)
  return {
    type: PlayerActionTypes.SET_PLAYER,
    payload: player,
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

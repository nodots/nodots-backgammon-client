import { UserInfoResponse as Auth0User } from 'auth0'
import {
  NodotsPlayer,
  NodotsPlayerActive,
  NodotsPlayerReady,
} from '../../../nodots_modules/backgammon-types'
import { togglePlayerSeekingGame } from './playerHelpers'

// Define action types as an enum to ensure consistency and prevent typos
export enum PlayerActionTypes {
  CREATE_PLAYER = 'CREATE_PLAYER',
  SET_PLAYER = 'SET_PLAYER',
  TOGGLE_PLAYER_SEEKING_GAME = 'TOGGLE_PLAYER_SEEKING_GAME',
}

interface CreatePlayerAction {
  type: PlayerActionTypes.CREATE_PLAYER
  payload: { user: Auth0User }
}

interface SetPlayerAction {
  type: PlayerActionTypes.SET_PLAYER
  payload: NodotsPlayer
}

interface TogglePlayerSeekingGameAction {
  type: PlayerActionTypes.TOGGLE_PLAYER_SEEKING_GAME
  payload: { seekingGame: boolean }
}

export type PlayerActions =
  | CreatePlayerAction
  | SetPlayerAction
  | TogglePlayerSeekingGameAction

export const togglePlayerSeekingGameAction = async (
  player: NodotsPlayerReady,
  dispatch: React.Dispatch<PlayerActions>
): Promise<TogglePlayerSeekingGameAction> => {
  console.log(player.isSeekingGame)
  const action: TogglePlayerSeekingGameAction = {
    type: PlayerActionTypes.TOGGLE_PLAYER_SEEKING_GAME,
    payload: { seekingGame: player.isSeekingGame },
  }
  dispatch(action)
  return action
}

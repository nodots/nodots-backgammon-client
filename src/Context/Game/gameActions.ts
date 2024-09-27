import { UserInfoResponse as Auth0User } from 'auth0'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'

// Define action types as an enum to ensure consistency and prevent typos
export enum GameActionTypes {
  CREATE_GAME = 'CREATE_GAME',
  SET_GAME = 'SET_GAME',
}

interface CreateGameAction {
  type: GameActionTypes.CREATE_GAME
  payload: { game: NodotsGame }
}

interface SetGameAction {
  type: GameActionTypes.SET_GAME
  payload: NodotsGame
}

export type GameActions = CreateGameAction | SetGameAction

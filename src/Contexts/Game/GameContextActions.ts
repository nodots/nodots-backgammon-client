import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

// Define action types as an enum to ensure consistency and prevent typos
export enum GameActionTypes {
  SET_GAME = 'SET_GAME',
}

// Define type for each action type to enforce type safety
export type SetGameAction = {
  type: GameActionTypes.SET_GAME
  payload: NodotsGame
}

export type GameActions = SetGameAction

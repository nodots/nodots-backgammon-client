import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

// Define action types as an enum to ensure consistency and prevent typos
export enum GameActionTypes {
  START_GAME = 'START_GAME',
}

// Define type for each action type to enforce type safety
export type StartGameAction = {
  type: GameActionTypes.START_GAME
  payload: NodotsGame
}

export type GameActions = StartGameAction

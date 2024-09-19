import { Player } from '../../../nodots_modules/backgammon-types'

// Define action types as an enum to ensure consistency and prevent typos
export enum PlayerActionTypes {
  SET_PLAYER = 'SET_PLAYER',
}

// Define type for each action type to enforce type safety
interface SetPlayerAction {
  type: PlayerActionTypes.SET_PLAYER
  payload: Player
}

export type PlayerActions = SetPlayerAction

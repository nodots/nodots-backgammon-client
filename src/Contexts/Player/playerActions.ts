import {
  NodotsPlayer,
  PlayerInitializing,
} from '../../../nodots_modules/backgammon-types'

// Define action types as an enum to ensure consistency and prevent typos
export enum PlayerActionType {
  SET_PLAYER = 'SET_PLAYER',
}

// Define type for each action type to enforce type safety
interface SetPlayerAction {
  type: PlayerActionType.SET_PLAYER
  player: NodotsPlayer | PlayerInitializing
}

export interface PlayerState {
  player: NodotsPlayer | PlayerInitializing
}

export type PlayerAction = SetPlayerAction

export const setPlayer = (player: NodotsPlayer): SetPlayerAction => {
  return {
    type: PlayerActionType.SET_PLAYER,
    player,
  }
}

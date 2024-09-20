import { GameActionTypes, GameActions } from './GameContextActions'
import {
  NodotsGameMoving,
  NodotsGamePlayingRolling,
  NodotsGameReady,
  NodotsGameRollingForStart,
} from '../../../nodots_modules/backgammon-types'
import { startGame, StartGamePayload } from './GameContextHelpers'

export type State = {
  game:
    | NodotsGameReady
    | NodotsGameRollingForStart
    | NodotsGameMoving
    | NodotsGamePlayingRolling
}

export const initialState: State = {
  game: {} as NodotsGameRollingForStart,
}

export function reducer(state: State, action: GameActions) {
  const { type, payload } = action
  console.log('[GameContextReducer] state:', state)
  console.log('[GameContextReducer] type:', type)
  console.log('[GameContextReducer] payload:', payload)
  return state
}

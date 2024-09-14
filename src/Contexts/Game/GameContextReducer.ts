import { GameActionTypes, GameActions } from './GameContextActions'
import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameReady,
  GameRollingForStart,
} from '../../../nodots_modules/backgammon-types'
import { startGame, StartGamePayload } from './GameContextHelpers'

export type State = {
  game: GameReady | GameRollingForStart | GamePlayingMoving | GamePlayingRolling
}

export const initialState: State = {
  game: {} as GameRollingForStart,
}

export function reducer(state: State, action: GameActions) {
  const { type, payload } = action
  console.log('[GameContextReducer] state:', state)
  console.log('[GameContextReducer] type:', type)
  console.log('[GameContextReducer] payload:', payload)
  return state
}

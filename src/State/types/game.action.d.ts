import { InitializeTurnActionPayload } from '../Game.context'
import { GAME_ACTION_TYPE } from '../game-state'
import { CheckerState } from './checker-state'

export interface DieRollActionPayload {
  color: Color
  order: DieOrder
  value: DieValue
}

export type GameActionPayload = DieRollActionPayload | CheckerState | MoveActionState | Color | InitializeTurnActionPayload

export interface GameAction {
  type: GAME_ACTION_TYPE
  payload: GameActionPayload
}

export interface InitializeTurnAction extends GameAction {
  type: GAME_ACTION_TYPE.INITIALIZE_TURN
  payload: InitializeTurnActionPayload
}

export interface DieRollAction extends GameAction {
  type: GAME_ACTION_TYPE.ROLL
  payload: DieRollActionPayload
}
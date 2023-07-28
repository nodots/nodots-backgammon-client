import { GAME_ACTION_TYPE } from '../game-state'
import { CheckerState } from './checker-state'

export interface DieRollActionPayload {
  color: Color
  order: DieOrder
  value: DieValue
}

export interface CheckerMoveState {
  dieValue: DieValue | undefined
  origin: CheckerBox | undefined
  destination: CheckerBox | undefined
  completed: boolean | undefined
}

export interface MoveState {
  status: MOVE_STATUS | undefined
  color: Color | undefined,
  moves: CheckerMoveState[]
}

export type GameActionPayload = DieRollActionPayload | CheckerState | MoveActionState | Color

export interface GameAction {
  type: GAME_ACTION_TYPE
  payload?: GameActionPayload
}
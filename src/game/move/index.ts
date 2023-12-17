import { MoveDirection } from '../game'
import { sanityCheckBoard } from '../../components/board/state/types/board'
import { Checker } from '../../components/checker/state'
import { Checkerbox } from '../../components/Checkerbox/state/types'
import { DieValue } from '../../components/die/state'
import { Player } from '../../components/player/state'
import { GAME_ACTION_TYPE } from '../game.reducer'
import { pointToPoint } from './point-to-point'
import { hit } from './hit'
import { reenter } from './reenter'
import { bearOff } from './bear-off'
import { revert } from './revert'

export enum MoveMode {
  PREDEFINED,
  POINT_TO_POINT,
  REENTER,
  BEAR_OFF,
  NO_MOVE,
  REVERT,
  ERROR,
}

export enum MoveStatus {
  INITIALIZED,
  REVERTED,
  COMPLETED,
  NO_MOVE,
  FORCED,
  ERROR,
}

/* 
Players make moves by putting checkers in different checkerboxes
then notifies the board with a MoveAction
*/
export interface MoveActionPayload {
  player: Player
  origin: Checkerbox
  destination?: Checkerbox
}

export interface MoveAction {
  type: GAME_ACTION_TYPE
  payload: MoveActionPayload
}

export type Move = {
  id: string
  dieValue: DieValue
  status: MoveStatus
  direction: MoveDirection
  order: number
  mode?: MoveMode
  checker?: Checker
  origin?: Checkerbox
  destination?: Checkerbox
  hit:
    | {
        checker: Checker
        checkerbox: Checkerbox
      }
    | undefined
}

export const isMove = (m: any): m is Move => {
  if (typeof m !== 'object') {
    return false
  }

  const keys = Object.keys(m)

  const idIndex = keys.findIndex((k) => k === 'id')
  if (idIndex === -1) {
    return false
  }

  const dieValueIndex = keys.findIndex((k) => k === 'dieValue')
  if (dieValueIndex === -1) {
    return false
  }

  const statusIndex = keys.findIndex((k) => k === 'status')
  if (statusIndex === -1) {
    return false
  }

  return true
}

export { pointToPoint, reenter, revert, hit, bearOff }

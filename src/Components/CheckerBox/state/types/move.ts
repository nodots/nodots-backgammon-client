import { produce } from 'immer'
import { Turn } from '../../../Player/state'
import { Checker } from '../../../Checker/state'
import { CheckerBox } from '.'
import { DieValue } from '../../../Die/state'
import { Player } from '../../../Player/state'
import { GAME_ACTION_TYPE } from '../../../../game.reducer'

export enum MoveMode {
  POINT_TO_POINT,
  HIT,
  REENTER,
  OFF,
}

export enum MoveStatus {
  INITIALIZED,
  ORIGIN_SET,
  DESTINATION_SET,
  COMPLETED,
  ERROR,
}

/* 
Players make moves by putting checkers in different checkerboxes
then notifies the board with a MoveAction
*/
export interface MoveActionPayload {
  player: Player,
  checkerbox: CheckerBox
}

export interface MoveAction {
  type: GAME_ACTION_TYPE,
  payload: MoveActionPayload
}

export type Move = {
  id: string
  dieValue: DieValue
  status: MoveStatus
  mode?: MoveMode
  checker?: Checker
  origin?: CheckerBox
  destination?: CheckerBox
}

export const reducer = (state: Turn, action: MoveAction): Turn => {
  const { type, payload } = action
  console.log(`[Move Reducer]: state`, state)
  console.log(`[Move Reducer]: type`, type)
  console.log(`[Move Reducer]: payload`, payload)

  switch (type) {
    case GAME_ACTION_TYPE.MOVE:
      state.moves.forEach((m, i) => {
        console.log(m.status)
        if (m.status === MoveStatus.INITIALIZED) {
          return produce(state, draft => {
            draft.moves[i].status = MoveStatus.ORIGIN_SET
            draft.moves[i].origin = payload.checkerbox
          })
        } else {
          throw Error('unexpected move status')
        }
      })
      // return produce(state, draft => {
      //   draft.id = generateId()
      //   draft.player = payload.player
      //   draft.roll = payload.roll
      //   draft.status = TurnStatus.INITIALIZED
      // })
      return state
    default:
      throw new Error('Unknown turn action')
  }
}
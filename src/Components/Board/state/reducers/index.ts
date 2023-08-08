import { produce } from 'immer'
import { Board, BOARD_ACTION_TYPE, MoveAction } from '../types'

export interface BoardAction {
  type: BOARD_ACTION_TYPE,
  payload: MoveAction
}

export const reducer = (state: Board, action: BoardAction): Board => {
  console.log(`[Board Reducer]: state`, state)
  console.log(`[Board Reducer]: action`, action)


  const newState = produce(state, draft => {
  })
  return newState
}

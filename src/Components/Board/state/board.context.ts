import { createContext, useReducer } from 'react'
import reducer from './reducers/board.reducer'
import { initBoardState } from './board.state'
import { BOARD_ACTION_TYPE, Board, MoveAction } from './types'


export const useBoardContext = (initialState: Board) => {
  const [board, dispatch] = useReducer(reducer, initialState)

  const moveChecker = (payload: MoveAction) => dispatch({ type: BOARD_ACTION_TYPE.MOVE_CHECKER, payload })
  return { board, moveChecker }
}

type UseBoardContextType = ReturnType<typeof useBoardContext>

const initContextState: UseBoardContextType = {
  board: initBoardState,
  moveChecker () { }

}
export const BoardContext = createContext<UseBoardContextType>(initContextState)

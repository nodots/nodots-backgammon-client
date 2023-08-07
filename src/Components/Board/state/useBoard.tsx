import { useContext } from 'react'
import { Board, MoveAction } from './types'
import { BoardContext } from './board.context'

type UseBoardHookType = {
  board: Board
  moveChecker?: (action: MoveAction) => void
}

export const useBoard = (): UseBoardHookType => {
  const { board, moveChecker } = useContext(BoardContext)
  return { board, moveChecker }
}

import { ReactElement } from 'react'
import { initBoardState } from './board.state'
import { BoardContext, useBoardContext } from './board.context'

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const BoardProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <BoardContext.Provider value={useBoardContext(initBoardState)}>
      {children}
    </BoardContext.Provider>
  )
} 
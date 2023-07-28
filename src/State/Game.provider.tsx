import { ReactElement } from 'react'
import { initGameState } from './Game.State'
import { GameContext, useGameContext } from './Game.context'

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const GameProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GameContext.Provider value={useGameContext(initGameState)}>
      {children}
    </GameContext.Provider>
  )
}

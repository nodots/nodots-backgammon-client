import { ReactElement } from 'react'
import { GameContext, useGameContext, initialGameState } from './game.context'

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const GameProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GameContext.Provider value={useGameContext(initialGameState)}>
      {children}
    </GameContext.Provider>
  )
} 
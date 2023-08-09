import { ReactElement } from 'react'
import { GameContext, useGameContext } from './game.context'
import { initialGameState } from './game.state'

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
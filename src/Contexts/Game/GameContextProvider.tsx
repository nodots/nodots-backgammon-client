import { ReactNode, useReducer } from 'react'
import { GameContext } from './GameContext'
import { reducer, initialState } from './GameContextReducer'

interface Props {
  children: ReactNode
}

function GameContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GameContext.Provider value={{ gameState: state, gameDispatch: dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider

import { ReactNode, useReducer } from 'react'
import { PlayerContext } from './PlayerContext'
import { reducer, initialState } from './PlayerContextReducer'

type PlayerProviderProps = {
  children: ReactNode
}

function PlayerContextProvider({ children }: PlayerProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider

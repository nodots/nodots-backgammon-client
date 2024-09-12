import { ReactNode, useReducer } from 'react'
import { PlayerContext } from './PlayerContext'
import { reducer, initialState } from './PlayerContextReducer'

interface Props {
  children: ReactNode
}

function PlayerContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PlayerContext.Provider
      value={{
        playerState: state,
        playerDispatch: dispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider

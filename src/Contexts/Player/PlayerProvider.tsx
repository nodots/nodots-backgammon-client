// PlayerProvider.tsx
import { ReactNode, useEffect, useReducer } from 'react'
import { initialPlayerState, playerReducer } from './playerReducer'
import { Loading } from '../../Components/Loading'
import { PlayerContext } from './PlayerContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getPlayerBySub } from './playerHelpers'
import { PlayerActionTypes } from './playerActions'

interface Props {
  children: ReactNode
}

const PlayerProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState)

  useEffect(() => {
    if (user?.sub) {
      getPlayerBySub(user.sub).then((p) => {
        console.log('[PlayerProvider] useEffect getPlayerBySub p:', p)
        dispatch({ type: PlayerActionTypes.SET_PLAYER, payload: p })
      })
    }
  }, [user])

  if (isLoading) {
    return <Loading />
  }

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider

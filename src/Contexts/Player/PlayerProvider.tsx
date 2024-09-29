// PlayerProvider.tsx
import { ReactNode, useEffect, useReducer } from 'react'
import { initialPlayerState, playerReducer } from './playerReducer'
import { PlayerContext } from './PlayerContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getPlayerBySub, setPlayer } from './playerHelpers'
import { PlayerActionTypes } from './playerActions'
import { Loading } from '../../Components/utils/Loading'
interface Props {
  children: ReactNode
}

const PlayerProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [playerState, playerDispatch] = useReducer(
    playerReducer,
    initialPlayerState
  )

  useEffect(() => {
    if (user?.sub) {
      getPlayerBySub(user.sub).then((p) => {
        console.log('[PlayerProvider] useEffect getPlayerBySub p:', p)
        setPlayer(p, playerDispatch)
      })
    }
  }, [user])

  if (isLoading) {
    return <Loading />
  }

  return (
    <PlayerContext.Provider value={{ playerState, playerDispatch }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider

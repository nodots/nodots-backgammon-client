// PlayerProvider.tsx
import { UserInfoResponse as Auth0User } from 'auth0'
import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { initialPlayerState, playerReducer } from './playerReducer'
import { Loading } from '../../Components/utils/Loading'
import { PlayerContext } from './PlayerContext'
import { useAuth0 } from '@auth0/auth0-react'
import {
  createPlayer,
  getPlayerBySub,
  loginPlayer,
  setPlayer,
} from './playerHelpers'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const PlayerProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState)

  useEffect(() => {
    console.log('[PlayerProvider] useEffect user:', user)

    if (user && user.email && user.sub) {
      const u = user as Auth0User
      getPlayerBySub(u.sub).then((player) => {
        if (player) {
          console.log('[PlayerProvider] useEffect setPlayer player:', player)
          setPlayer(player, dispatch)
        } else {
          console.log('[PlayerProvider] useEffect createPlayer user:', user)
          createPlayer(u, dispatch).then((p) => loginPlayer(p))
        }
      })
    }
  }, [user])

  if (isLoading && !state.player.id) {
    return <Loading />
  }
  return (
    <PlayerContext.Provider
      value={{ playerState: state, playerDispatch: dispatch }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider

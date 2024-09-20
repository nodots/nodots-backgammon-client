// PlayerProvider.tsx
import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { playerReducer, PlayerState } from './playerReducer'
import { Loading } from '../../Components/Loading'
import { PlayerContext } from './PlayerContext'
import { useAuth0 } from '@auth0/auth0-react'
import { createPlayerFromAuth0User, getPlayerBySub } from './playerHelpers'
import { PlayerActions, PlayerActionTypes } from './playerActions'
import { UserInfoResponse as Auth0User } from 'auth0'
import { NodotsPlayerActive } from '../../../nodots_modules/backgammon-types'

const ips: PlayerState = {
  player: {
    id: '',
    kind: 'initializing',
    email: '',
    source: '',
    externalId: '',
    isLoggedIn: false,
  },
}
interface Props {
  children: ReactNode
}

const setPlayer = async (
  player: NodotsPlayerActive,
  dispatch: React.Dispatch<PlayerActions>
) => {
  dispatch({
    type: PlayerActionTypes.SET_PLAYER,
    payload: player,
  })
}

const createPlayer = async (
  user: Auth0User,
  dispatch: React.Dispatch<PlayerActions>
) => {
  const userSub = user.sub as string
  const userEmail = user.email as string
  const userName = user.name as string
  const userNickName = user.nickname as string
  const userEmailVerified = user.email_verified as boolean
  const userUpdatedAt = user.updated_at as string
  const playerReady = await createPlayerFromAuth0User({
    sub: userSub,
    email: userEmail,
    name: userName,
    nickname: userNickName,
    email_verified: userEmailVerified,
    updated_at: userUpdatedAt,
    picture: user.picture,
    locale: user.locale,
  })

  dispatch({ type: PlayerActionTypes.SET_PLAYER, payload: playerReady })
}

const PlayerProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [state, dispatch] = useReducer(playerReducer, ips)

  useEffect(() => {
    console.log('[PlayerProvider] useEffect user:', user)
    const typedSub = user?.sub as string
    if (user && user.email && typedSub) {
      getPlayerBySub(typedSub).then((player) => {
        if (player) {
          setPlayer(player, dispatch)
        } else {
          createPlayer(
            {
              sub: typedSub,
              email: user.email as string,
              name: user.name as string,
              nickname: user.nickname as string,
              email_verified: user.email_verified as boolean,
              updated_at: user.updated_at as string,
              picture: user.picture,
              locale: user.locale,
            },
            dispatch
          )
        }
      })
    }
  }, [])

  if (isLoading && !state.player.id) {
    return <Loading />
  }
  console.log('[PlayerProvider] state:', state)
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider

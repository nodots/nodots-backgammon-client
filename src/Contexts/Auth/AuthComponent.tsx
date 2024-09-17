import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from '../../Components/Loading'
import { setPlayer } from '../../Contexts/Player/playerActions'
import { useNavigate } from 'react-router-dom'
import { PlayerInitializing } from '../../../nodots_modules/backgammon-types'
import { LobbyPage } from '../../Pages/Protected/LobbyPage'
import { addPlayer, getPlayerBySub } from '../Player/playerHelpers'
import { useEffect } from 'react'

function AuthComponent() {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading message="AuthComponent Loading ..." />
  } else {
    return <LobbyPage />
  }
}

export default AuthComponent

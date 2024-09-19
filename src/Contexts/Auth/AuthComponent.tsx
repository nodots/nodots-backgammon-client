import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from '../../Components/Loading'
import { PlayerActionTypes } from '../../Contexts/Player/playerActions'
import { useNavigate } from 'react-router-dom'
import { Player } from '../../../nodots_modules/backgammon-types'
import { LobbyPage } from '../../Pages/Protected/LobbyPage'
import { addPlayer, getPlayerBySub } from '../Player/playerHelpers'
import { useEffect, useState } from 'react'
import { usePlayerContext } from '../Player/usePlayerContext'

function AuthComponent() {
  const { user, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    user && navigate('/bg/lobby')
  }, [user])
}

export default AuthComponent

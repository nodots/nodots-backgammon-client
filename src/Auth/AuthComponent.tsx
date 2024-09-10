import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { NodotsPlayer } from '../../nodots_modules/backgammon-types'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Components/Loading'
import { useNodotsPlayer } from '../Contexts/Player/useNodotsPlayer'
import { PlayerActionTypes } from '../Contexts/Player/PlayerContextActions'
import { apiUrl } from '../App'
// import { withTranslation, WithTranslation } from 'react-i18next'
// import { NodotsPlayerInitialized } from '../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'

function AuthComponent() {
  const { user, isLoading } = useAuth0()
  const { state, dispatch } = useNodotsPlayer()
  const [player, setPlayer] = useState<NodotsPlayer | null>(null)
  const navigate = useNavigate()

  const initializePlayer = async (p: NodotsPlayer) => {
    try {
      setPlayer(p)
      p.isLoggedIn = true
      sessionStorage.setItem('playerId', p.id)
      dispatch({ type: PlayerActionTypes.SET_PLAYER, payload: p })
      navigate('/protected/lobby', { state: { player: p } })
    } catch (error) {
      console.error('Error initializing player:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetch(`${apiUrl}/auth`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(async (response) => {
        const player = await response.json()
        response.ok && initializePlayer(player)
      })
    }
  }, [user])

  if (isLoading) {
    return <Loading />
  }
}

export default AuthComponent

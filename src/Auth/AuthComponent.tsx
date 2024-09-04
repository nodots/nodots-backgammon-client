import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { NodotsPlayer } from '../../nodots_modules/backgammon-types'
import { useNavigate } from 'react-router-dom'
// import { withTranslation, WithTranslation } from 'react-i18next'
// import { NodotsPlayerInitialized } from '../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'

function AuthComponent() {
  const { user, isLoading } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const navigate = useNavigate()

  const initializePlayer = async (p: NodotsPlayer) => {
    try {
      setPlayer(p)
      sessionStorage.setItem('playerId', p.id)
      navigate('/lobby')
    } catch (error) {
      console.error('Error initializing player:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetch('http://127.0.0.1:3000/auth', {
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
    return <div>Loading...</div>
  }
}

export default AuthComponent

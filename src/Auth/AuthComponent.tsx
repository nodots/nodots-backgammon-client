import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { NodotsPlayer } from '../../nodots_modules/backgammon-types'
import { useNavigate } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import { NodotsPlayerInitialized } from '../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'

function AuthComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      return
    }

    fetch(`http://localhost:3000/player/${user.email}`).then((response) => {
      switch (response.status) {
        case 200:
          response.json().then((player: NodotsPlayer) => {
            setPlayer(player)
          })
          navigate('/lobby')
          break
        case 404:
          fetch('http://localhost:3000/player/add-auth0-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          }).then((response) => {
            response.json().then((player) => {
              setPlayer(player)
            })
            navigate('/lobby')
          })
          break
        default:
          console.error('Failed to get player')
          break
      }
    })
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return <></>
  }
}

export default AuthComponent

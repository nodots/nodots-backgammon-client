import { User as Auth0User } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { playerHome } from '../../../App'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import {
  createPlayer,
  getPlayerBySub,
  setPlayer,
} from '../../../Contexts/Game/playerHelpers'

function AuthComponent() {
  const { user, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const ts = new Date().toISOString()
      console.log(`${ts} [AuthComponent] user:`, user)
      user &&
        user.sub &&
        getPlayerBySub(user.sub).then((p) => {
          console.log(`${ts} [AuthComponent] getPlayerBySub p:`, p)
          if (p) {
            setPlayer(p)
            navigate(playerHome)
          } else {
            createPlayer(user).then((p) => {
              if (p) {
                setPlayer(p)
                navigate(playerHome)
              } else {
                console.error(
                  '[AuthComponent] createPlayer failed to create player'
                )
              }
            })
          }
        })
    }, 1000)
    return () => clearInterval(interval)
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }
}

export default AuthComponent

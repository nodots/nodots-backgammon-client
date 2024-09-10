import { useNodotsPlayer } from '../../Contexts/Player/useNodotsPlayer'
import { useEffect, useState } from 'react'
import { getPlayerById } from '../../Contexts/Player/PlayerContextHelpers'
import { PlayerActionTypes } from '../../Contexts/Player/PlayerContextActions'
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom'
import { LobbyPage } from './LobbyPage'
import { Loading } from '../../Components/Loading'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'

export const ProtectedPages = () => {
  const { state, dispatch } = useNodotsPlayer()
  const [player, setPlayer] = useState<NodotsPlayer | null>(null)
  const navigate = useNavigate()
  const playerId = sessionStorage.getItem('playerId')

  // if (!playerId) {
  //   return <Navigate to="/sign-in" />
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerId && !player) {
        getPlayerById(playerId).then((p) => {
          if (p) {
            setPlayer(p)
            dispatch({ type: PlayerActionTypes.SET_PLAYER, payload: p })
          }
        })
      } else {
        console.log('Player already set:', player)
      }
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return player ? <Outlet context={{ player }} /> : <Loading />
}

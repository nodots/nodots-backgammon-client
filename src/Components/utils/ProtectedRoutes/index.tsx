import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useGameContext } from '../../../Contexts/Game/GameContext'
import { useAuth0 } from '@auth0/auth0-react'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import {
  getPlayerById,
  getPlayerBySub,
} from '../../../Contexts/Game/playerHelpers'

export const ProtectedRoutes = () => {
  const [activePlayer, setActivePlayer] = useState<NodotsPlayer | null>(null)
  const { user, isLoading, isAuthenticated } = useAuth0()
  const { player, setPlayer } = useGameContext()

  useEffect(() => {
    if (!activePlayer && player) {
      setActivePlayer(player)
    }
    if (user?.sub && isAuthenticated && !isLoading && !activePlayer) {
      console.log('[ProtectedRoutes] user:', user)
      console.log('[ProtectedRoutes] player:', player)
    }
  }, [user, player])

  return player ? <Outlet /> : <Navigate to="/sign-in" />
}

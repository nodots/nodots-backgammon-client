// GameProvider.tsx
import { UserInfoResponse as Auth0User } from 'auth0'
import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { initialGameState, gameReducer } from './gameReducer'
import { Loading } from '../../Components/utils/Loading'
import { GameContext } from './GameContext'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { clear } from 'console'
import { usePlayerContext } from '../Player/usePlayerContext'
import { getActiveGameByPlayerId, setGame } from './gameHelpers'

interface Props {
  children: ReactNode
}

const GameProvider = ({ children }: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState
  const [state, dispatch] = useReducer(gameReducer, { game: initialGameState })

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && user && player && player.kind !== 'initializing') {
        getActiveGameByPlayerId(player.id).then((g) => {
          g && setGame(g, dispatch)
        })
      }
    }, 1000)
    return clearInterval(interval)
  }, [])

  return !state.game || state.game.kind !== 'initializing' ? (
    <Loading message="GameProvider loading game" />
  ) : (
    <GameContext.Provider value={{ gameState: state, gameDispatch: dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider

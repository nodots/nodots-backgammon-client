// GameProvider.tsx
import { UserInfoResponse as Auth0User } from 'auth0'
import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { initialGameState, gameReducer } from './gameReducer'
import { Loading } from '../../Components/utils/Loading'
import { GameContext } from './GameContext'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const GameProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, { game: initialGameState })

  useEffect(() => {
    console.log('[GameProvider] useEffect state:', state)
  }, [])

  return (
    <GameContext.Provider value={{ gameState: state, gameDispatch: dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider

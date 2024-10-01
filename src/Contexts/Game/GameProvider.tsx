// GameProvider.tsx
import { ReactNode, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useAuth0 } from '@auth0/auth0-react'
import { usePlayerContext } from '../Player/usePlayerContext'
import { getActiveGameByPlayerId } from './gameHelpers'
import { GameContext } from './GameContext'
import { gameState } from './gameState'
import { Loading } from '../../Components/utils/Loading'

interface Props {
  children: ReactNode
}

const GameProvider = ({ children }: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    console.log('[GameProvider] useEffect:')
  }, [isAuthenticated, user])

  // return gameState?.game?.kind === 'initializing' ? (
  //   <Loading message="GameProvider loading game" />
  // ) : (
  //   <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  // )

  return gameState?.game?.kind === 'initializing' ? (
    <>Loading</>
  ) : (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  )
}

export default observer(GameProvider)

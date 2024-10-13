// GameProvider.tsx
import { ReactNode, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useAuth0 } from '@auth0/auth0-react'
import { GameContext } from './GameContext'
import { gameState } from './gameState'
import { Loading } from '../../Components/utils/Loading'
import { getPlayerById } from './playerHelpers'
import { getActiveGameById, getGameById } from './gameHelpers'

interface Props {
  children: ReactNode
}

const GameProvider = ({ children }: Props) => {
  const playerId = sessionStorage.getItem('playerId')
  const gameId = sessionStorage.getItem('gameId')

  useEffect(() => {
    console.log('[GameProvider] useEffect gameState:', gameState)
    if (!gameState.player && playerId) {
      getPlayerById(playerId).then((p) => {
        if (p && p.kind && p.kind === 'ready') {
          gameState.setPlayer(p)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!gameState.game && gameId) {
      getActiveGameById(gameId).then((g) => {
        if (g) {
          gameState.setGame(g)
        }
      })
    }
  }, [])

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  )
}

export default observer(GameProvider)

// GameProvider.tsx
import { ReactNode, useEffect, useReducer } from 'react'
import { initialGameState, gameReducer } from './gameReducer'
import { useAuth0 } from '@auth0/auth0-react'
import { initialPlayerState, playerReducer } from '../Player/playerReducer'
import { GameContext } from './GameContext'

interface Props {
  children: ReactNode
}

const GameProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [gameState, gameDispatch] = useReducer(gameReducer, {
    game: initialGameState,
  })
  const { game } = gameState

  const [playerState, playerDispatch] = useReducer(playerReducer, {
    player: initialPlayerState,
  })

  const { player } = playerState

  useEffect(() => {
    console.log('[GameProvider] useEffect game:', game)
    console.log('[GameProvider] useEffect player:', player)
  }, [])

  return (
    <AppContext.Provider
      value={{
        gameContext: {
          state: gameState,
          dispatch: gameDispatch,
        },
        playerContext: {
          state: playerState,
          dispatch: playerDispatch,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider

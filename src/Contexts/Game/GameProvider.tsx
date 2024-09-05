import { ReactElement, useState, useEffect } from 'react'
import { getGameById } from './GameContextHelpers'
import { GameContext } from './GameContext'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import { Loading } from '../../Components/Loading'

interface Props {
  children: ReactElement | ReactElement[]
}

export const GameProvider = ({ children }: Props) => {
  const gameId = sessionStorage.getItem('gameId')
  const [game, setGame] = useState<NodotsGame>({
    kind: 'game-initializing',
    id: 'fake',
  })
  useEffect(() => {
    if (gameId) {
      getGameById(gameId).then((game) => setGame(game))
    }
  }, [])
  return game ? (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  ) : (
    <Loading />
  )
}

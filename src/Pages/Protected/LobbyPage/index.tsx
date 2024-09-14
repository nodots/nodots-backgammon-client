import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import {
  NodotsGame,
  NodotsPlayer,
  PlayerReady,
} from '../../../../nodots_modules/backgammon-types'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { useEffect, useState } from 'react'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { GameActionTypes } from '../../../Contexts/Game/GameContextActions'
import { getGameById } from '../../../Contexts/Game/GameContextHelpers'
import GamePage from '../GamePage'

interface Props {
  player: PlayerReady
}

export const LobbyPage = ({ player }: Props) => {
  const [game, setGame] = useState<NodotsGame | null>(null)
  const { gameState, gameDispatch } = useNodotsGame()
  const gameId = sessionStorage.getItem('gameId')

  useEffect(() => {
    const interval = setInterval(() => {
      !game &&
        gameId &&
        getGameById(gameId).then((g) => {
          if (g) {
            setGame(g)
            gameDispatch({ type: GameActionTypes.SET_GAME, payload: g })
          }
        })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return game ? (
    <GamePage game={game} player={player} />
  ) : (
    player && (
      <>
        <NodotsAppBar player={player} />
        <Container>
          <SeekingGameToggle player={player} />
          <Friends player={player} />
        </Container>
      </>
    )
  )
}

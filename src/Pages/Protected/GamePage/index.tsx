import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../../../Contexts/Game/GameContextHelpers'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
import { Loading } from '../../../Components/Loading'

const GamePage = () => {
  const { gameState, gameDispatch } = useNodotsGame()
  const [game, setGame] = useState<NodotsGame | null>(null)
  const { playerState, playerDispatch } = useNodotsPlayer()
  const [player, setPlayer] = useState<NodotsPlayer | null>(null)
  const { gameId } = useParams<{ gameId: string }>()

  useEffect(() => {
    const interval = setInterval(() => {
      !player && playerState.player && setPlayer(playerState.player)

      !game &&
        gameId &&
        getGameById(gameId).then((g) => {
          if (g) {
            setGame(g)
          }
        })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return game && player ? (
    <NodotsBoardComponent game={game} player={player} />
  ) : (
    <Loading message="Loading NodotsBoardComponet..." />
  )
}

export default GamePage

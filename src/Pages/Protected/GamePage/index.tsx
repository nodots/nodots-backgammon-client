import { Container, Paper } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameReady,
  GameRollingForStart,
  NodotsGame,
  NodotsPlayer,
  PlayerPlaying,
} from '../../../../nodots_modules/backgammon-types'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../../../Contexts/Game/GameContextHelpers'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
import { Loading } from '../../../Components/Loading'
import { getPlayerById } from '../../../Contexts/Player/PlayerContextHelpers'

const GamePage = () => {
  const { gameState, gameDispatch } = useNodotsGame()
  const { playerState, playerDispatch } = useNodotsPlayer()
  const [game, setGame] = useState<NodotsGame | null>(null)
  const [player, setPlayer] = useState<PlayerPlaying | null>(null)
  const { gameId } = useParams<{ gameId: string }>()
  const playerId = sessionStorage.getItem('playerId')
  useEffect(() => {
    const interval = setInterval(() => {
      !player &&
        playerId &&
        getPlayerById(playerId).then((p) => {
          if (p) {
            if (p.kind === 'player-playing') {
              setPlayer(p)
            } else {
              console.error('Invalid player kind:', p.kind)
            }
          }
        })

      !game &&
        gameId &&
        getGameById(gameId).then((g) => {
          if (g) {
            sessionStorage.setItem('gameId', g.id)
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
    <Loading message={game?.kind} />
  )
}

export default GamePage

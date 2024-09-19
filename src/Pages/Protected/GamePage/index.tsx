import { Container, Paper } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameReady,
  GameRollingForStart,
  NodotsGame,
  Player,
  PlayerPlaying,
} from '../../../../nodots_modules/backgammon-types'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../../../Contexts/Game/GameContextHelpers'
import { Loading } from '../../../Components/Loading'
import { getPlayerById } from '../../../Contexts/Player/playerHelpers'
import NodotsGameNotifications from '../../../Components/NodotsNotificationsComponent/GameNotifications'

const GamePage = () => {
  const [game, setGame] = useState<NodotsGame | null>(null)
  const [player, setPlayer] = useState<PlayerPlaying | null>(null)
  const { gameId } = useParams<{ gameId: string }>()
  const playerId = sessionStorage.getItem('playerId')

  useEffect(() => {
    const interval = setInterval(() => {
      if (!player && playerId) {
        console.log('Fetching player with ID:', playerId)
        getPlayerById(playerId)
          .then((p) => {
            if (p) {
              console.log('Player fetched:', p)
              if (p.kind === 'player-playing') {
                setPlayer(p)
              } else {
                console.error('Invalid player kind:', p.kind)
              }
            } else {
              console.error('Player not found')
            }
          })
          .catch((error) => {
            console.error('Error fetching player:', error)
          })
      }

      if (!game && gameId) {
        console.log('Fetching game with ID:', gameId)
        getGameById(gameId)
          .then((g) => {
            if (g) {
              console.log('Game fetched:', g)

              setGame(g)
            } else {
              console.error('Game not found')
            }
          })
          .catch((error) => {
            console.error('Error fetching game:', error)
          })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [player, game, playerId, gameId])

  switch (game?.kind) {
    case 'game-ready':
      return (
        player && (
          <div id="GamePage">
            <NodotsGameNotifications />
            <NodotsBoardComponent game={game} player={player} />
          </div>
        )
      )
    case 'game-rolling-for-start':
      return <>GameRollingForStart</>
    case 'game-playing-rolling':
      return <>GamePlayingRolling</>
    case 'game-playing-moving':
      return <>GamePlayingMoving</>
    default:
      return <>NoGame</>
  }
}

export default GamePage

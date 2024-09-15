import { Alert, AlertColor } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { useNodotsPlayer } from '../../Contexts/Player/useNodotsPlayer'

const getOpponent = (game: NodotsGame, player: NodotsPlayer): NodotsPlayer => {
  if (game && game.players) {
    return game.players.black.id === player.id
      ? game.players.white
      : game.players.black
  }
  throw Error('No opponent found')
}

interface Props {
  game: NodotsGame
  player: NodotsPlayer
  severity?: AlertColor
}

function NodotsGameNotifications({ game, player, severity }: Props) {
  const [opponent, setOpponent] = useState<NodotsPlayer | null>(null)

  const { gameState } = useNodotsGame()
  const { playerState } = useNodotsPlayer()

  const [activeGame, setActiveGame] = useState<NodotsGame>(game)
  const [activePlayer, setActivePlayer] = useState<NodotsPlayer>(player)

  useEffect(() => {
    if (gameState) {
      setActiveGame(gameState.game)
    }
  }, [gameState])

  useEffect(() => {
    if (playerState) {
      setActivePlayer(playerState.player)
    }
  }, [playerState])

  useEffect(() => {
    if (activeGame && activeGame.players) {
      setOpponent(getOpponent(activeGame, activePlayer))
    }
  }, [activeGame, activePlayer])

  return game && game.id && opponent && opponent.id ? (
    <Alert severity={severity}>
      <div>gameId: {game.id}</div>
      <div>kind: {game.kind}</div>
      <div>player1: {player.id}</div>
      <div>opponentId: {opponent.id}</div>
    </Alert>
  ) : (
    <div>Loading...</div>
  )

  // switch (game?.kind) {
  //   case 'game-ready':
  //   case 'game-rolling-for-start':
  //   case 'game-playing-rolling':
  //   case 'game-playing-moving':
  //     return (
  //       <Alert severity={severity}>
  //         <div>gameId: {game.id}</div>
  //         <div>kind: {game.kind}</div>
  //         <div>player1: {player?.id}</div>
  //         <div>opponentId: {opponent?.id}</div>
  //       </Alert>
  //     )
  //   default:
  //     return <div>Loading... {game?.kind}</div>
  // }
}

export default NodotsGameNotifications

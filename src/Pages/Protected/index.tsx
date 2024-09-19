import { useEffect, useState } from 'react'
import { getPlayerById } from '../../Contexts/Player/playerHelpers'
import { NodotsGame, Player } from '../../../nodots_modules/backgammon-types'
import {
  getGameById,
  startGame as gameContextStartGame,
} from '../../Contexts/Game/GameContextHelpers'
import { GameActionTypes } from '../../Contexts/Game/GameContextActions'
import GamePage from './GamePage'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ProtectedPages = () => {
  const navigate = useNavigate()
  const [player, setPlayer] = useState<Player | null>(null)
  const [game, setGame] = useState<NodotsGame | null>(null)
  const playerId = sessionStorage.getItem('playerId')
  const gameId = sessionStorage.getItem('gameId')

  // const initializeGame = async (g: NodotsGame) => {
  //   alert('initializeGame')
  //   if (!player) throw Error('No player to initialize game')
  //   console.log('[ProtectedPages] initializeGame g:', g)
  //   console.log('[ProtectedPages] initializeGame player:', player)
  //   alert(`Preparing to setGame for gameId ${g.id}`)
  //   setGame(g)
  //   try {
  //     gameDispatch({ type: GameActionTypes.SET_GAME, payload: g })
  //   } catch (e) {
  //     throw Error('Error setting game in initializeGame')
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     !player &&
  //       playerId &&
  //       getPlayerById(playerId).then((p) => {
  //         console.log('[ProtectedPages] getPlayerById p:', p)
  //         setPlayer(p)
  //       })

  //     !game &&
  //       gameId &&
  //       getGameById(gameId).then((g) => {
  //         if (g) {
  //           setGame(g)
  //           gameDispatch({ type: GameActionTypes.SET_GAME, payload: g })
  //         }
  //       })
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  game
    ? console.log('[ProtectedPages] game:', game)
    : console.log('[ProtectedPages] game is null')

  const startGame = (opponentId: string) => {
    if (game) {
      return
    }
    if (!player) {
      return
    }
    gameContextStartGame([player.id, opponentId]).then((game) => {
      console.log('[ProtectedPages] startGame game:', game)

      navigate(`/bg/game/${game.id}`, {
        state: { game, player },
      })
      // initializeGame(game)
    })
    // game
    //   ? console.log('[ProtectedPages] game exists:', game)
    //   : player &&
    //     gameContextStartGame([player.id, opponentId]).then((game) => {
    //       console.log('[ProtectedPages] startGame game:', game)
    //
    //       initializeGame(game)
    //     })
  }

  return game && player ? (
    <GamePage />
  ) : (
    <>
      <h1>ProtectedPage</h1>{' '}
      <div>
        playerId: {playerId}
        <Button
          onClick={() => startGame('7e112abe-0c4d-4a47-a9c5-670e5803ed3d')}
        >
          Start Game
        </Button>
      </div>
    </>
  )
}

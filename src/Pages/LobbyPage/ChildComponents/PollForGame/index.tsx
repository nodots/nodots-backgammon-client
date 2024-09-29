// import { useNodotsGame } from '../../../Contexts/Game/GameHook'
import { useNavigate } from 'react-router-dom'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import { get } from 'http'
import {
  getActiveGameByPlayerId,
  setGame,
} from '../../../../Contexts/Game/gameHelpers'
import { NodotsGame } from '../../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../../Contexts/Game/useGameContext'

const PollForGame = () => {
  const { playerState, playerDispatch } = usePlayerContext()
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const navigate = useNavigate()

  useEffect(() => {
    console.log('[PollForGame] useEffect playerState:', playerState)
    const interval = setInterval(() => {
      if (playerState && playerState.player && playerState.player.id) {
        console.log(
          '[PollForGame] useEffect getActiveGameByPlayerId:',
          playerState.player.id
        )
        getActiveGameByPlayerId(playerState.player.id).then((game) => {
          console.log(
            '[PollForGame] useEffect getActiveGameByPlayerId game:',
            game
          )
          switch (game?.kind) {
            case 'rolling-for-start':
            case 'rolling':
            case 'moving':
              setGame(game, gameDispatch)
              navigate('/game/' + game.id)
              break
          }
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [game])

  return <>Polling for games</>
}

export default PollForGame

// import { useNodotsGame } from '../../../Contexts/Game/GameHook'
import { useNavigate } from 'react-router-dom'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import { get } from 'http'
import {
  getActiveGameByPlayerId,
} from '../../../../Contexts/Game/gameHelpers'
import { NodotsGame } from '../../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../../Contexts/Game/useGameContext'
import { useAuth0 } from '@auth0/auth0-react'

const PollForGame = () => {
  const { user } = useAuth0()
  const { game } = useGameContext()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      user &&
        getActiveGameByPlayerId(playerState.player.id).then((game) => {
          console.log(
            '[PollForGame] useEffect getActiveGameByPlayerId game:',
            game
          )
          switch (game?.kind) {
            case 'rolling-for-start':
            case 'rolling':
            case 'moving':
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

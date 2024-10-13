import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getActiveGameByPlayerId } from '../../../../Contexts/Game/gameHelpers'
import { useGameContext } from '../../../../Contexts/Game/useGameContext'
import { useAuth0 } from '@auth0/auth0-react'
import { observer } from 'mobx-react-lite'
import {
  NodotsGame,
  NodotsGameInitializing,
} from '../../../../../nodots_modules/backgammon-types'

const PollForGame = () => {
  const { game, player } = useGameContext()
  const navigate = useNavigate()
  console.log('[PollForGame] game:', game)

  useEffect(() => {
    if (player?.id) {
      const interval = setInterval(() => {
        // console.log('[PollForGame] polling for game player:', player)
        player &&
          player.kind === 'playing' &&
          getActiveGameByPlayerId(player.id).then((g) => {
            console.log('[PollForGame] getActiveGameByPlayerId g:', g)
            if (g) {
              if (!g.id || g === undefined) alert('WTF no game id')
              sessionStorage.setItem('gameId', g.id)
              navigate('/game/' + g.id)
            }
          })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  return <></>
}

export default observer(PollForGame)

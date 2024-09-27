// import { useNodotsGame } from '../../../Contexts/Game/GameHook'
import { useNavigate } from 'react-router-dom'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import { get } from 'http'
import { getActiveGameByPlayerId } from '../../../../Contexts/Game/gameHelpers'
import { NodotsGame } from '../../../../../nodots_modules/backgammon-types'

const PollForGame = () => {
  const { playerState, playerDispatch } = usePlayerContext()
  const [activeGame, setActiveGame] = useState<NodotsGame | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('[PollForGame] useEffect playerState:', playerState)

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
        if (game) {
          setActiveGame(game)
          navigate('/game')
        }
      })
    }
  }, [activeGame])

  return <>Polling for games</>
}

export default PollForGame

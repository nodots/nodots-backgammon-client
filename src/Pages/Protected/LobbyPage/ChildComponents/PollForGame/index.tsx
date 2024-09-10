import { useState, useEffect } from 'react'
import useNodotsGame from '../../../Contexts/Game/GameHook'
import { useNavigate } from 'react-router-dom'
import { IGame } from '../../../../nodots_modules/backgammon-types'

const PollForGame = () => {
  const { getPlayerGames } = useNodotsGame()
  const navigate = useNavigate()
  const playerId = sessionStorage.getItem('playerId')

  useEffect(() => {
    const interval = setInterval(() => {
      playerId &&
        getPlayerGames(playerId).then((game) => {
          if (game && game.id) {
            sessionStorage.setItem('gameId', game.id?.toString())
            navigate(`/game`)
          }
        })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <>Polling for games</>
}

export default PollForGame

import { useEffect, useState } from 'react'
import { NodotsPlayerSeekingGame } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

function PlayersSeekingGame() {
  const { user } = useAuth0()
  const { game, getPlayersSeekingGame } = useNodotsGame()
  const [playersSeekingGame, setPlayersSeekingGame] = useState<
    NodotsPlayerSeekingGame[]
  >([])

  const updatePlayersSeekingGame = (players: NodotsPlayerSeekingGame[]) => {
    const otherPlayers = players.filter((p) => p.email !== user?.email)
    setPlayersSeekingGame(otherPlayers)
  }

  useEffect(() => {
    getPlayersSeekingGame().then((players) => {
      updatePlayersSeekingGame(players)
    })
  }, [])

  const challengePlayer = (playerId: string) => {
    return () => {
      console.log('Challenge player', playerId)
    }
  }

  const getPlayerList = () => {
    return playersSeekingGame.map((player) => (
      <li key={player.id}>
        <a
          className="nodots-backgammon-action"
          onClick={challengePlayer(player.id)}
        >
          {player.email.split('@')[0]}{' '}
        </a>
      </li>
    ))
  }

  return (
    <div>
      <h2>Players seeking game</h2>
      <ul className="nodots-player-list">{getPlayerList()}</ul>
    </div>
  )
}

export default PlayersSeekingGame

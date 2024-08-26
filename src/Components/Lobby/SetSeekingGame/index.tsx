import { useEffect, useState } from 'react'
import {
  NodotsPlayer,
  NodotsPlayerSeekingGame,
} from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { useAuth0 } from '@auth0/auth0-react'
import { UserInfoResponse as Auth0User } from 'auth0'
import { Button } from '@mui/material'

const setSeekingGame = (playerId: string) => {
  return fetch(`http://localhost:3000/player/seeking-game`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerId }),
  }).then((response) => {
    if (response.ok) {
      console.log(`Setting seeking game for player ${playerId}`)
    } else {
      console.log('Error setting seeking game')
    }
  })
}

function SetSeekingGame() {
  const { user } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const { getPlayerForEmail } = useNodotsGame()

  useEffect(() => {
    if (user && user.email) {
      getPlayerForEmail(user.email).then((player) => {
        console.log(player)
        if (player) {
          setPlayer(player)
        }
      })
    }
  }, [])

  console.log(player)
  switch (player?.kind) {
    case 'player-seeking-game':
    case 'player-playing':
      return <></>
    case 'player-initialized':
      return (
        <Button onClick={() => setSeekingGame(player.id)}>
          Set Seeking Game
        </Button>
      )
  }
}

export default SetSeekingGame

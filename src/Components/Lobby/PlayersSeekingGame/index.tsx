import { useEffect, useState } from 'react'
import { NodotsPlayerSeekingGame } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container, Link, List, ListItem } from '@mui/material'

function PlayersSeekingGame() {
  const { user } = useAuth0()
  const { game, getPlayersSeekingGame, getPlayerForEmail } = useNodotsGame()
  const [playersSeekingGame, setPlayersSeekingGame] = useState<
    NodotsPlayerSeekingGame[]
  >([])
  const [player, setPlayer] = useState<NodotsPlayerSeekingGame>()

  const updatePlayersSeekingGame = (players: NodotsPlayerSeekingGame[]) => {
    const otherPlayers = players.filter((p) => p.email !== user?.email)
    setPlayersSeekingGame(otherPlayers)
  }

  useEffect(() => {
    if (user && user.email && !player) {
      getPlayerForEmail(user.email).then((player) => {
        switch (player?.kind) {
          case 'player-initialized':
          case 'player-playing':
          case 'player-seeking-game':
            const playerSeekingGame = player as NodotsPlayerSeekingGame
            setPlayer(playerSeekingGame)
        }
      })
    }
    getPlayersSeekingGame().then((players) => {
      updatePlayersSeekingGame(players)
    })
  }, [])

  const challengePlayer = (opponent: NodotsPlayerSeekingGame) => {
    console.log(
      `${JSON.stringify(player)} challenging player ${JSON.stringify(opponent)}`
    )
    return (
      user &&
      player &&
      fetch(`http://localhost:3000/offer/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offeringPlayer: player,
          offeredPlayer: opponent,
        }),
      }).then((response) => {
        if (response.ok) {
          console.log(`Challenging player ${JSON.stringify(opponent)}`)
        } else {
          console.log('Error challenging player')
        }
      })
    )
  }

  const getPlayerList = () => {
    return playersSeekingGame.map(
      (player) =>
        player.id && (
          <ListItem key={player.id}>
            Want to play a game with
            <Button
              sx={{ marginLeft: '.25rem', cursor: 'pointer' }}
              onClick={() => challengePlayer(player)}
            >
              {player.email}
            </Button>
            ?
          </ListItem>
        )
    )
  }

  return <Container>{user && <List>{getPlayerList()}</List>}</Container>
}

export default PlayersSeekingGame

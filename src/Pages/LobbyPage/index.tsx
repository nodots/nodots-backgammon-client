import { Box, Button, Paper, TextField } from '@mui/material'
import { Component, useEffect, useState } from 'react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'
import { useAuth0 } from '@auth0/auth0-react'
import useNodotsGame from '../../Hooks/GameHook'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'

const LobbyPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { game, getPlayerGames } = useNodotsGame()
  const [playerGames, setPlayerGames] = useState<NodotsGame[]>()

  useEffect(() => {
    if (user && user.email) {
      getPlayerGames(user.email).then((games) => {
        console.log(games)
        setPlayerGames(games)
      })
    }
  }, [user])

  return (
    <Paper id="LobbyPageContainer">
      <h2>Welcome to Nodots Backgammon!</h2>
      <h3>Current Games</h3>

      <SignOutButton />
    </Paper>
  )
}

export default LobbyPage

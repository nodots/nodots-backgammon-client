import { Box, Button, Paper, TextField } from '@mui/material'
import { Component, useEffect, useState } from 'react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'
import { useAuth0 } from '@auth0/auth0-react'
import useNodotsGame from '../../Hooks/GameHook'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import PlayersSeekingGame from '../../Components/Lobby/PlayersSeekingGame'

interface Props {}

const LobbyPage: React.FC<Props> = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <Paper id="LobbyPageContainer">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Welcome to Nodots Backgammon!</h2>
          <PlayersSeekingGame />
          <SignOutButton />
        </>
      )}
    </Paper>
  )
}

export default LobbyPage

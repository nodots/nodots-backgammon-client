import { Box, Button, Paper, TextField } from '@mui/material'
import { Component, useEffect } from 'react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { redirect } from 'react-router-dom'

const LobbyPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  !isLoading && (!user || !isAuthenticated) ? redirect('/sign-in') : null

  return (
    <Paper id="LobbyPageContainer">
      <h2>Welcome to Nodots Backgammon!</h2>
      <SignOutButton />
    </Paper>
  )
}

export default LobbyPage

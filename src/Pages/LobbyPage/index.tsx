import { Box, Button, Container, Paper, TextField } from '@mui/material'
import { Component, useEffect, useState } from 'react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'
import { useAuth0 } from '@auth0/auth0-react'
import useNodotsGame from '../../Hooks/GameHook'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import PlayersSeekingGame from '../../Components/Lobby/PlayersSeekingGame'
import SetSeekingGame from '../../Components/Lobby/SetSeekingGame'
import AvailableOffers from '../../Components/Lobby/AvailableOffers'

interface Props {}

const LobbyPage: React.FC<Props> = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { getPlayersSeekingGame } = useNodotsGame()
  return (
    <Container>
      <h1>Welcome{user?.given_name ? `, ${user.given_name}!` : '!'}</h1>
      <Container>
        <AvailableOffers />
        <SetSeekingGame />
        <PlayersSeekingGame />
        <SignOutButton />
      </Container>
    </Container>
  )
}

export default LobbyPage

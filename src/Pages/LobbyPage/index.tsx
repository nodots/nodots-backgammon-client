import { AppBar, Box, Button, Container, Paper, TextField } from '@mui/material'
import { Component, useEffect, useState } from 'react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'
import { useAuth0 } from '@auth0/auth0-react'
import useNodotsGame from '../../Hooks/GameHook'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'
import PlayersSeekingGame from '../../Components/Lobby/PlayersSeekingGame'
import SetSeekingGame from '../../Components/Lobby/SetSeekingGame'
import AvailableOffers from '../../Components/Lobby/AvailableOffers'
import NodotsAppBar from '../../Components/NodotsAppBar'
import { useTranslation } from 'react-i18next'

interface Props {}

const LobbyPage: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { getPlayersSeekingGame } = useNodotsGame()
  return (
    <>
      <NodotsAppBar />
      <Container>
        <h1>
          {t('NDBG_WELCOME')}
          {user?.given_name ? `, ${user.given_name}!` : '!'}
        </h1>
        <Container>
          <AvailableOffers />
          <PlayersSeekingGame />
        </Container>
      </Container>
    </>
  )
}

export default LobbyPage

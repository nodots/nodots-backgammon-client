import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import { NodotsPlayerActive } from '../../../../nodots_modules/backgammon-types'
import { Loading } from '../../../Components/Loading'

export const LobbyPage = () => {
  const { state, dispatch } = usePlayerContext()
  console.log('[LobbyPage] state.player:', state.player)
  return !state.player ? (
    <Loading message="Lobby Page Waiting for Player" />
  ) : (
    <>
      <NodotsAppBar />
      <Container>
        <SeekingGameToggle />
        <Friends />
      </Container>
    </>
  )
}

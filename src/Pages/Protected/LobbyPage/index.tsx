import { useAuth0 } from '@auth0/auth0-react'
import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import { useTranslation } from 'react-i18next'
import LocaleSwitcher from '../../../Components/LocaleSwitcher'
import useNodotsGame from '../../../Contexts/Game/GameHook'
import { NodotsLocaleCode } from '../../../i18n'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import { useEffect, useState } from 'react'
import { Loading } from '../../../Components/Loading'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { useNavigate } from 'react-router-dom'

interface Props {
  player: NodotsPlayer
}

export const LobbyPage = ({ player }: Props) => {
  const navigate = useNavigate()
  switch (player.kind) {
    case 'player-ready':
      return (
        <>
          <NodotsAppBar player={player} />
          <Container>
            <SeekingGameToggle player={player} />
            <Friends player={player} />
          </Container>
        </>
      )
    case 'player-playing':
      return <></>
  }
}

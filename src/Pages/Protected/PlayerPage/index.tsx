import { useAuth0 } from '@auth0/auth0-react'
import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import { useTranslation } from 'react-i18next'
import LocaleSwitcher from '../../../Components/LocaleSwitcher'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { NodotsLocaleCode } from '../../../i18n'
import { Player } from '../../../../nodots_modules/backgammon-types'
import { useEffect, useState } from 'react'
import { Loading } from '../../../Components/Loading'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'

interface Props {
  player: Player
}

const PlayerPage = ({ player }: Props) => {
  return (
    <>
      <NodotsAppBar player={player} />
    </>
  )
}

export default PlayerPage

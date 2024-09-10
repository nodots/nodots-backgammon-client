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

const PlayerPage = () => {
  const { state, dispatch } = useNodotsPlayer()

  return state?.player ? (
    <>
      <NodotsAppBar player={state.player} />
    </>
  ) : (
    <Loading />
  )
}

export default PlayerPage

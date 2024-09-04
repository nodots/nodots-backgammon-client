import { useAuth0 } from '@auth0/auth0-react'
import { Container } from '@mui/material'
import NodotsAppBar from '../../Components/NodotsAppBar'
import { useTranslation } from 'react-i18next'
import LocaleSwitcher from '../../Components/LocaleSwitcher'
import useNodotsGame from '../../Contexts/Game/GameHook'
import { NodotsLocaleCode } from '../../i18n'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'
import { useEffect, useState } from 'react'

const PlayerPage = () => {
  const { updatePlayerLocale, getPlayerForAuth0Sub } = useNodotsGame()
  const { user, isLoading } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const { t, i18n } = useTranslation()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  // useEffect(() => {
  //   if (user?.sub) {
  //     getPlayerForAuth0Sub(user.sub).then((player) => {
  //       player ? setPlayer(player) : console.error('Player not found')
  //     })
  //   }
  // }, [user])

  return <div>player</div>
}

export default PlayerPage

import { useAuth0 } from '@auth0/auth0-react'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'
import Friends from '../../Components/Lobby/Friends'
import NodotsAppBar from '../../Components/NodotsAppBar'
import useNodotsGame from '../../Hooks/GameHook'

const LobbyPage = () => {
  const { updatePlayerLocale, getPlayerForAuth0Sub } = useNodotsGame()
  const { user, isLoading } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (user?.sub) {
      getPlayerForAuth0Sub(user.sub).then((player) => {
        player ? setPlayer(player) : console.error('Player not found')
      })
    }
  }, [user])

  return player ? (
    <>
      <NodotsAppBar />
      <Container>
        <h1>
          {t('NDBG_WELCOME')} {player?.preferences?.username}
        </h1>
        <Container>
          <Friends />
        </Container>
      </Container>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default LobbyPage

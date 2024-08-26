import { useAuth0 } from '@auth0/auth0-react'
import { Container } from '@mui/material'
import NodotsAppBar from '../../Components/NodotsAppBar'
import { useTranslation } from 'react-i18next'

const PlayerPage = () => {
  const { user, isLoading } = useAuth0()
  const { t, i18n } = useTranslation()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  switch (user) {
    case null:
      return <div>Not authenticated</div>
    case undefined:
      return <div>Not authenticated</div>
    default:
      return (
        <>
          <NodotsAppBar title={t('NDBG_PLAYER_PROFILE')} />
          <Container>
            <h1>
              {t('NDBG_WELCOME')}
              {user?.given_name ? `, ${user.given_name}!` : '!'}
            </h1>
            {i18n.language}
          </Container>
        </>
      )
  }
}

export default PlayerPage

import { AppBar, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SignInButton from '../../../Forms/Auth0/Buttons/SignInButton'
import LocaleSwitcher from '../../../Components/LocaleSwitcher'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const { t } = useTranslation()
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <>
      <AppBar position="static" id="AppBarHomePage">
        <LocaleSwitcher />
      </AppBar>
      <Container>
        <h1>{t('NDBG_HOMEPAGE_TITLE')}</h1>
        <p>{t('NDBG_HOMEPAGE_DESCRIPTION')}</p>
        <SignInButton text={t('NDBG_GET_STARTED')} />
      </Container>
    </>
  )
}

export default HomePage

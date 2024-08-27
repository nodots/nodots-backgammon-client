import { AppBar, Container, Toolbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SignInButton from '../../Forms/Auth0/Buttons/SignInButton'
import LocaleSwitcher from '../../Components/LocaleSwitcher'

type ExternalUser = {
  token: string
  externalId: string
  email: string
}

function HomePage() {
  const { t } = useTranslation()
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

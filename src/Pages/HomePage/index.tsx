import { AppBar, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SignInButton from '../../Forms/Auth0/Buttons/SignInButton'
import LanguageSwitcher from '../../Components/LanguageSwitcher'

type ExternalUser = {
  token: string
  externalId: string
  email: string
}

function HomePage() {
  const { t } = useTranslation()
  return (
    <>
      <AppBar
        position="static"
        sx={{ display: 'flex', alignItems: 'flex-end' }}
      >
        <LanguageSwitcher />
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

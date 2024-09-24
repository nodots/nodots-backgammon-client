import { Container } from '@mui/material'
import SignInButton from '../../Components/Forms/Auth0/Buttons/SignInButton'
import { useTranslation } from 'react-i18next'

const SignInPage = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <h2>{t('NDBG_WELCOME')}</h2>
      <p>{t('NDBG_REGISTER_OR_SIGN_IN_TO_PLAY')}</p>
      <SignInButton />
    </Container>
  )
}

export default SignInPage

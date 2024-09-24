import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

interface Props {
  text?: string
}

const getButtonText = (text: string | undefined) => (text ? text : 'Sign In')

const Auth0SignInButton = ({ text }: Props) => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => loginWithRedirect()

  return (
    <Button variant="contained" onClick={handleLogin}>
      {getButtonText(text)}
    </Button>
  )
}

export default Auth0SignInButton

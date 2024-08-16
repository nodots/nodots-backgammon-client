import { useAuth0 } from '@auth0/auth0-react'

const Auth0SignInButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  return <button onClick={() => handleLogin()}>Log In</button>
}

export default Auth0SignInButton

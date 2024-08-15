import { useAuth0 } from '@auth0/auth0-react'

const Auth0SignInButton = () => {
  const { loginWithRedirect } = useAuth0()

  return <button onClick={() => loginWithRedirect()}>Log In</button>
}

export default Auth0SignInButton

import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

const SignOutButton = () => {
  const { logout } = useAuth0()
  const playerId = sessionStorage.getItem('playerId')

  const handleClick = () => {
    console.log('Signing out...')
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <Button variant="text" onClick={handleClick}>
      Sign Out
    </Button>
  )
}

export default SignOutButton

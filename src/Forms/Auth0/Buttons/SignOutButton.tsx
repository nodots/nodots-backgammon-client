import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

const SignOutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  )
}

export default SignOutButton

import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { Button, Box, Container } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

export const HomePage = () => {
  const { loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  const handleSignIn = (e: React.MouseEvent) => {
    navigate('/sign-in')
  }

  return <Container component='main' maxWidth='xs'>
    <h1>Nodots Backgammon</h1>

    <Box component='form' action='http://localhost:3300/login/federated/google' noValidate sx={{ mt: 1 }}>
      <Button variant='contained' onClick={() => loginWithRedirect()}>Sign In</Button>
    </Box>
  </Container >

}

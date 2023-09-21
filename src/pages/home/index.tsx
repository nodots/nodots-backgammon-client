import { useNavigate } from 'react-router-dom'
import { Button, Box, Container, Paper, Card, CardHeader } from '@mui/material'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  const handleSignUp = (e: React.MouseEvent) => {
    navigate('/sign-up')
  }

  const handleSignIn = (e: React.MouseEvent) => {
    navigate('/sign-in')
  }

  return <Container component='main' maxWidth='xs'>
    <h1>Nodots Backgammon</h1>

    <Box>
      <Button onClick={handleSignUp} color='secondary'>Sign Up</Button>
      <Button variant='contained' onClick={handleSignIn} color='primary'>Sign In</Button>
    </Box>
  </Container >

}

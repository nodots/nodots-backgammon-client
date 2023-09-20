import { useNavigate } from 'react-router-dom'
import { Button, CardContent, Container, Paper, Card, CardHeader } from '@mui/material'

export const HomePage = () => {
  const navigate = useNavigate()

  const handleSignUp = (e: React.MouseEvent) => {
    navigate('/sign-up')
  }

  const handleSignIn = (e: React.MouseEvent) => {
    navigate('/sign-in')
  }

  return <Container>
    <Card className='form'>
      <CardHeader title='Nodots Backgammon' />
      <CardContent>
        <p>You've tried the rest. Now you've found the best.</p>
        <Button variant='contained' onClick={handleSignUp}>Sign Up</Button>
        <Button variant='contained' color='secondary' onClick={handleSignIn}>Sign In</Button>

      </CardContent>
    </Card>
  </Container>

}

import { useNavigate } from 'react-router-dom'
import { Button, Container, Paper } from '@mui/material'

export const HomePage = () => {
  const navigate = useNavigate()

  const handleSignUp = (e: React.MouseEvent) => {
    navigate('/sign-up')
  }

  const handleSignIn = (e: React.MouseEvent) => {
    navigate('/sign-in')
  }

  return <div className='Board'>
    <Container>
      <Button variant='contained' onClick={handleSignUp}>Sign Up</Button>
      <Button variant='contained' color='secondary' onClick={handleSignIn}>Sign In</Button>
    </Container>
  </div>

}

import { TextField, Button, Card, CardContent, CardHeader, FormGroup } from '@mui/material'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import './form.scss'

const RegistrationForm = () => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    console.log('SIGN IN')
    localStorage.setItem('signed-in', 'true')
    return navigate('/game')
  }

  return <Card className='form'>
    <CardHeader title='Sign In' />
    <CardContent>
      <FormGroup>
        <TextField required type='email' placeholder='joe@bloggs.com' variant='filled' label='Email' />
        <TextField required type='password' placeholder='********' variant='filled' label='Password' />
      </FormGroup>
      <Button onClick={handleClick} variant='contained'>Sign In</Button>
    </CardContent>
  </Card>
}

export default RegistrationForm
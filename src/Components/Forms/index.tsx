import { IconButton, Button, Card, CardContent, Grid, TextField } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import AppleIcon from '@mui/icons-material/Apple'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import FacebookIcon from '@mui/icons-material/FaceBook'

const RegistrationForm = () => {
  return <Card className='registration-form'>
    <CardContent>
      <Grid container className='registration-form-grid'>
        <Grid item>
          <h2>Use Existing Account</h2>
          <IconButton><GoogleIcon /></IconButton>
          <IconButton><AppleIcon />  </IconButton>
          <IconButton><MicrosoftIcon /></IconButton>
          <IconButton><FacebookIcon /></IconButton>
        </Grid>
        <Grid item>
          <h2>Create New Account</h2>
          <form>
            <TextField variant='filled' fullWidth label='Email' type='email' placeholder='joe@bloggs.com'></TextField>
            <TextField variant='filled' fullWidth label='Password' type='password'></TextField>
            <Button variant='contained'>Register</Button>
          </form>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
}

export default RegistrationForm
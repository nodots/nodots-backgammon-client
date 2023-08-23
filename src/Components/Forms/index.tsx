import { Button, Card, CardContent, Grid, TextField } from '@mui/material'

const RegistrationForm = () => {
  return <Card className='registration-form'>
    <CardContent>
      <Grid container className='registration-form-grid'>
        <Grid item className='column social'>
          <h2>Use Existing Account</h2>
          <Button variant='contained' className='social-signin-button'>Google</Button>
          <Button variant='contained' className='social-signin-button'>Apple</Button>
          <Button variant='contained' className='social-signin-button'>Microsoft</Button>
          <Button variant='contained' className='social-signin-button'>Facebook</Button>
        </Grid>
        <Grid item className='column nodots'>
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
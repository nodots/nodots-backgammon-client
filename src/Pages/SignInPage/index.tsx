import { Box, Button, Paper, TextField } from '@mui/material'
import { Component } from 'react'
import { SignInForm } from '../../Forms/SignInForm'
import SignInButton from '../../Forms/Auth0/Buttons/SignInButton'
// import SignInForm from './SignInForm' // Import the SignInForm component

type ExternalUser = {
  token: string
  externalId: string
  email: string
}

class SignInPage extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props)
  }

  render() {
    return (
      <Paper id="SignInContainer">
        {/* <SignInForm /> */}
        <h2>Welcome!</h2>
        <p>Please register or sign in to play!</p>
        <SignInButton />
      </Paper>
    )
  }
}

export default SignInPage

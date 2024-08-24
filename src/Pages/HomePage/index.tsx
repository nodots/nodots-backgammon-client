import { Container, List, ListItem, Paper, Typography } from '@mui/material'
import { Component } from 'react'
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
      <Container>
        <h1>Welcome to Nodots Backgammon (beta)</h1>
        <p>
          We offer the best backgammon playing experience on every device from
          your phone to your TV with no apps to install. Play and interact with
          others seamlessly in English, French, Arabic, and Turkish. Any device.
          Any time.
        </p>
        <SignInButton text="Get Started!" />
      </Container>
    )
  }
}

export default SignInPage

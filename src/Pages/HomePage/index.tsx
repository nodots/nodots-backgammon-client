import { Paper } from '@mui/material'
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
      <>
        <h1>Welcome to Nodots Backgammon</h1>
        <SignInButton />
      </>
    )
  }
}

export default SignInPage

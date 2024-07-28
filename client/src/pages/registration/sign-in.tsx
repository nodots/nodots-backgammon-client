import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'


export const SignIn = () => {
  const navigate = useNavigate()
  const { isLoading, user } = useAuth0()

  if (isLoading) {
    return (
      <Backdrop
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  } else {
    console.log(user)

    async function getUser (user: any) {
      console.log('getUser user', user)
      const userResult = await fetch('http://localhost:3300/api/user', {
        headers: {
          'content-type': 'application/json',
          'cross-domain': 'true'
        },
        method: 'POST',
        body: JSON.stringify(user)

      })
      const u = await userResult.json()
      return u
    }
    getUser(user).then(u => {
      navigate('/game')
    })

  }

}

import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function AuthComponent() {
  const { user, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const ts = new Date().toISOString()
      console.log(`${ts} [AuthComponent] user:`, user)
      user && navigate('/bg/lobby')
    }, 1000)

    return () => clearInterval(interval)
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }
}

export default AuthComponent

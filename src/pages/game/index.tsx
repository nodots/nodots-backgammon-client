import { useAuth0 } from '@auth0/auth0-react'
import Board from '../../Components/Board'
import NavBar from '../../Components/Core/NavBar'

const API_SERVER = 'http://127.0.0.1:3300'
const USER_END_POINT = `${API_SERVER}/user`

export const GamePage = () => {
  const { user } = useAuth0()

  return (
    <>
      <NavBar />
      <Board />
    </>
  )

}


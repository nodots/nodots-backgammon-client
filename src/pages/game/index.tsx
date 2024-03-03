import { useAuth0 } from '@auth0/auth0-react'
import Board from '../../components/Board'
import NavBar from '../../components/core/core'

const API_SERVER = 'http://127.0.0.1:3300'
const USER_END_POINT = `${API_SERVER}/user`

const showAds = false

export const GamePage = () => {
  const { user } = useAuth0()

  return (
    <div id="GameContainer">
      <Board />
    </div>
  )
}

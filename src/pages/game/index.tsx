import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Board from '../../Components/Board'
import NavBar from '../../Components/Core/NavBar'
import { redirect } from 'react-router-dom'

const API_SERVER = 'http://127.0.0.1:3300'
const USER_END_POINT = `${API_SERVER}/user`

export const GamePage = () => {
  const { user } = useAuth0()

  useEffect(() => {
    const urlSearchString = window.location.search
    const params = new URLSearchParams(urlSearchString)
    const uid = user?.email || localStorage.getItem('nodots-backgammon-uid')

    const fetchUser = async (uid: string) => {
      if (user) {

        const response = await fetch(`${USER_END_POINT}/${uid}`)
        const responseJson = await response.json()
        console.log(responseJson)
        if (!responseJson.user) {
          const createResponse = await fetch(`${USER_END_POINT}`, { method: 'POST', body: JSON.stringify(user) })
        }
        return responseJson.user
      }

      if (uid) {
        const user = fetchUser(uid)
      }
    }


  }, [])

  return (
    <>
      <NavBar />
      <Board />
    </>
  )

}


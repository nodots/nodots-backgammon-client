import { useAuth0 } from '@auth0/auth0-react'
import { ReactElement, useState, useEffect } from 'react'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'
import { PlayerContext } from './PlayerContext'
import { getPlayerById, getPlayerBySub } from './PlayerContextHelpers'
import { Loading } from '../../Components/Loading'

interface Props {
  children: ReactElement | ReactElement[]
}

export const PlayerProvider = ({ children }: Props) => {
  const playerId = sessionStorage.getItem('playerId')
  const { user } = useAuth0()
  const [player, setPlayer] = useState<NodotsPlayer>({
    kind: 'player-initializing',
    email: 'fake@nodots.com',
    id: 'fake',
    isLoggedIn: true,
  })
  useEffect(() => {
    if (playerId) {
      getPlayerById(playerId).then((player) => setPlayer(player))
    } else {
      if (user?.sub) {
        getPlayerBySub(user.sub).then((player) => {
          sessionStorage.setItem('playerId', player.id)
          setPlayer(player)
        })
      }
    }
  }, [])
  return player ? (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  ) : (
    <Loading />
  )
}

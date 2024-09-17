import { ReactNode, useEffect, useReducer, useState } from 'react'
import { playerReducer } from './playerReducer'
import {
  NodotsPlayer,
  PlayerInitializing,
} from '../../../nodots_modules/backgammon-types'
import { Loading } from '../../Components/Loading'
import { playerContext } from './playerContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getPlayerBySub } from './playerHelpers'
interface Props {
  children: ReactNode
}

const getInitialPlayer = async (sub: string) => {
  try {
    const player = await getPlayerBySub(sub)
    return player
  } catch (err) {
    console.error(err)
  }
  return null
}

const PlayerProvider = ({ children }: Props) => {
  const { user, isLoading } = useAuth0()
  const [player, setPlayer] = useState<
    NodotsPlayer | PlayerInitializing | null
  >(null)

  return player ? (
    <playerContext.Provider value={{ player }}>
      {children}
    </playerContext.Provider>
  ) : (
    <Loading message="Loading Player ..." />
  )
}

export default PlayerProvider

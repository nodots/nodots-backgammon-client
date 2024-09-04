import { useContext } from 'react'
import { PlayerContext } from './PlayerContext'

export const useNodotsPlayer = () => {
  const playerContext = useContext(PlayerContext)
  return playerContext
    ? playerContext
    : { player: undefined, setPlayer: () => {} }
}

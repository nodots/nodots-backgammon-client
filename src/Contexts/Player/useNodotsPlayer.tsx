import { useContext } from 'react'
import { PlayerContext } from './PlayerContext'

export const useNodotsPlayer = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('The PlayerContext must be used within a PlayerProvider')
  }
  return context
}

import { useContext } from 'react'
import { PlayerContext } from './PlayerContext'

export const usePlayerContext = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('The App Context must be used within an AppContextProvider')
  }

  return context
}

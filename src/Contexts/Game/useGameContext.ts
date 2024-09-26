import { useContext } from 'react'
import { GameContext } from './GameContext'

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('The App Context must be used within an AppContextProvider')
  }

  return context
}

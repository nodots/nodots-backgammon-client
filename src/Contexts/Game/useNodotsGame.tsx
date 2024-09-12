import { useContext } from 'react'
import { GameContext } from './GameContext'

export const useNodotsGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('The GameContext must be used within GameContextProvider')
  }
  return context
}

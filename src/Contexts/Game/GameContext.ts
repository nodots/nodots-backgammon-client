// GameContext.ts
import { createContext, useContext } from 'react'
import { gameState } from './gameState'

export const GameContext = createContext(gameState)

export const useGameContext = () => {
  return useContext(GameContext)
}

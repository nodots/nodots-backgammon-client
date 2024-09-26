import { createContext } from 'react'
import { GameActions } from './gameActions'
import { GameState } from './gameReducer'

export type GameContextType = {
  gameState: GameState
  gameDispatch: React.Dispatch<GameActions>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

import { createContext } from 'react'
import { GameActions } from './GameContextActions'
import { State } from './GameContextReducer'

const gameDispatch: React.Dispatch<GameActions> = () => {}

export interface GameContextType {
  gameState: State
  gameDispatch: React.Dispatch<GameActions>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

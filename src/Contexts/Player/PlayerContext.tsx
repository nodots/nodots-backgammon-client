import { createContext } from 'react'
import { PlayerActions } from './playerActions'
import { PlayerState } from './playerReducer'

export type PlayerContextType = {
  state: PlayerState
  dispatch: React.Dispatch<any>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)

import { createContext } from 'react'
import { PlayerActions } from './playerActions'
import { PlayerState } from './playerReducer'

export type PlayerContextType = {
  playerState: PlayerState
  playerDispatch: React.Dispatch<PlayerActions>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)

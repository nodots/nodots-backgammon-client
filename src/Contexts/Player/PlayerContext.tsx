import { createContext } from 'react'
import { PlayerActions, PlayerActionTypes } from './PlayerContextActions'
import { State } from './PlayerContextReducer'

// Define the type for our context data
export type PlayerContextType = {
  playerState: State
  playerDispatch: React.Dispatch<PlayerActions>
  // appLogout: () => void
}

export const appLogout = {
  type: PlayerActionTypes.LOGOUT_PLAYER,
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)

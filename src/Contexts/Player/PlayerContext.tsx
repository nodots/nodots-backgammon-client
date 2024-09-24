import { createContext } from 'react'
import { PlayerActions } from './playerActions'
import { PlayerState } from './playerReducer'

export type PlayerContextType = {
  state: PlayerState
  dispatch: React.Dispatch<PlayerActions>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)
export const ips: PlayerState = {
  player: {
    id: '',
    kind: 'initializing',
    email: '',
    source: '',
    externalId: '',
    isLoggedIn: false,
  },
}

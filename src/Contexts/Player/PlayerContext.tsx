import { createContext } from 'react'
import { PlayerActions } from './PlayerContextActions'
import { State, initialState, reducer } from './PlayerContextReducer'
import { getPlayers } from './PlayerContextHelpers'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'

// Define the type for our context data
export type PlayerContextType = {
  state: State
  dispatch: React.Dispatch<PlayerActions>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)

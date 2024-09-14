import { createContext } from 'react'
import { PlayerActions, PlayerActionTypes } from './PlayerContextActions'
import { State } from './PlayerContextReducer'
import {
  PlayerPlaying,
  PlayerReady,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

// Define the type for our context data
export type PlayerContextType = {
  playerState: State
  playerDispatch: React.Dispatch<PlayerActions>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
)

export const setPlayerPlaying = async (
  playerId: string
): Promise<PlayerPlaying> => {
  alert('Making API call to setPlayerPlaying')
  return fetch(`${apiUrl}/player/playing/${playerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

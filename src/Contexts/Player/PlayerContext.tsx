import { createContext } from 'react'
import { NodotsPlayer } from '../../../nodots_modules/backgammon-types'

export interface IPlayerContext {
  player: NodotsPlayer | undefined
  setPlayer: React.Dispatch<React.SetStateAction<NodotsPlayer>>
}

export const PlayerContext = createContext<IPlayerContext | undefined>(
  undefined
)

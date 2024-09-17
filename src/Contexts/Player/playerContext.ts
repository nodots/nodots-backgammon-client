import { createContext } from 'react'
import {
  NodotsPlayer,
  PlayerInitializing,
} from '../../../nodots_modules/backgammon-types'

export type PlayerContextType = {
  player: NodotsPlayer | PlayerInitializing
}

export const playerContext = createContext<PlayerContextType | undefined>(
  undefined
)

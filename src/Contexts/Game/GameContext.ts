import { createContext } from 'react'
import { NodotsGame } from '../../../nodots_modules/backgammon-types'

export interface IGameContext {
  game: NodotsGame | undefined
  setGame: React.Dispatch<React.SetStateAction<NodotsGame>>
}

export const GameContext = createContext<IGameContext | undefined>(undefined)

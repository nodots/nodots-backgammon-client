import { createContext } from 'react'
import {
  GameRollingForStart,
  NodotsGame,
} from '../../../nodots_modules/backgammon-types'
import { GameActions } from './GameContextActions'
import { State } from './GameContextReducer'
import { StartGamePayload } from './GameContextHelpers'

export interface GameContextType {
  gameState: State
  gameDispatch: React.Dispatch<GameActions>
  // startGame: (payload: StartGamePayload) => Promise<GameRollingForStart>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

// export const startGame = (game: NodotsGame): NodotsGame => {
//   return game
// }

import { createContext } from 'react'
import type { Board, Player, Cube, Color, Checker } from '../Models'
import { GameMove } from '../Models'

export interface GameContextProps {
  readonly id: string,
  readonly board: Board | undefined,
  readonly cube: Cube | undefined,
  readonly players: {
    black: Player | undefined,
    white: Player | undefined,
  }
  onMove: (move: GameMove) => GameMove
  onRollForStart: () => Color
  onSetActivePlayer: (color?: Color) => void
}

const GameContext = createContext<GameContextProps | undefined>(undefined)
export default GameContext
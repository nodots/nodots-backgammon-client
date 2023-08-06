// Hooks
import { useContext } from 'react'
// Models
import { Board, Player, Point, Rail, Off, CheckerBox, Color, Turn, Move, TurnStatus } from '../models'
// State
import { CubeState } from '../state/types/cube.state'
import { DieRollActionPayload } from '../state/types/game.action'
import { GameContext } from '../state/Game.context'

type UseGameHookType = {
  board: Board
  players: {
    white: Player
    black: Player
  }
  cube: CubeState
  activeTurn: {
    status: TurnStatus | undefined
    player: Player | undefined
    moves: Move[]
  }
  activeColor: Color
  move: (checkerBox: CheckerBox) => void
  double: () => void
  debug: {
    isActive: boolean
    components: {
      player: boolean
      die: boolean
      cube: boolean
      rollSurface: boolean
      quadrant: boolean
      off: boolean
      checkerboxes: boolean
    }
  }
}

export const useGame = (): UseGameHookType => {
  const { state: { board, players, cube, activeTurn, activeColor, debug }, move, double } = useContext(GameContext)
  return { board, players, cube, activeTurn, activeColor, move, double, debug }
}

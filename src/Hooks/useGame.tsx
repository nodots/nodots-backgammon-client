// Hooks
import { useContext } from 'react'
// Models
import { Board, Player, Point, Rail, Off, CheckerBox, Color, Turn, Move, TurnStatus } from '../models'
// State
import { DieState, RollSurfaceState } from '../state/types/die.state'
import { CubeState } from '../state/types/cube.state'
import { DieRollActionPayload } from '../state/types/game.action'
import { GameContext } from '../state/Game.context'

type UseGameHookType = {
  board: Board
  players: {
    white: Player
    black: Player
  }
  dice: {
    white: [DieState, DieState]
    black: [DieState, DieState]
  }
  rollSurfaces: {
    white: RollSurfaceState
    black: RollSurfaceState
  }
  cube: CubeState
  activeTurn: {
    status: TurnStatus | undefined
    player: Player | undefined
    moves: Move[]
  }
  activeColor: Color
  roll: (dieRollAction: DieRollActionPayload) => void
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
      checkerBoxes: boolean
    }
  }
}

export const useGame = (): UseGameHookType => {
  const { state: { board, players, cube, dice, activeTurn, activeColor, rollSurfaces, debug }, roll, move, double } = useContext(GameContext)
  return { board, players, cube, dice, activeTurn, activeColor, rollSurfaces, roll, move, double, debug }
}

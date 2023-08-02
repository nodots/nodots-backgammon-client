// Hooks
import { useContext } from 'react'
// Models
import { Board, Player, Point, Rail, Off, CheckerBox, Color } from '../models'
// State
import { DieState, RollSurfaceState } from '../state/types/die.state'
import { CubeState } from '../state/types/cube.state'
import { CheckerMoveState, DieRollActionPayload } from '../state/types/game.action'
import { GameContext } from '../state/Game.context'
import { MOVE_STATUS } from '../state/game.state'

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
    status: MOVE_STATUS | undefined
    color: Color | undefined
    moves: CheckerMoveState[]
  }
  activeColor: Color
  roll: (dieRollAction: DieRollActionPayload) => void
  move: (checkerBox: CheckerBox, container: Point | Rail | Off) => void
  finalizeMove: (color: Color) => void
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
  const { state: { board, players, cube, dice, activeTurn, activeColor, rollSurfaces, debug }, roll, move, finalizeMove, double } = useContext(GameContext)
  return { board, players, cube, dice, activeTurn, activeColor, rollSurfaces, roll, move, finalizeMove, double, debug }
}

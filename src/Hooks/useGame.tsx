import { useContext } from 'react'
import { Board, Player, Point, Rail, Off, CheckerBox, Color, DieValue } from '../Models'
import { DieState, RollSurfaceState } from '../State/types/die-state'
import { CubeState } from '../State/types/cube-state.d'
import { CheckerMoveState, DieRollActionPayload } from '../State/types/game-action'
import { GameContext } from '../State/Game.context'
import { MOVE_STATUS } from '../State/Game.State'

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
  activeMove: {
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
  const { state: { board, players, cube, dice, activeMove, activeColor, rollSurfaces, debug }, roll, move, finalizeMove, double } = useContext(GameContext)
  return { board, players, cube, dice, activeMove, activeColor, rollSurfaces, roll, move, finalizeMove, double, debug }
}

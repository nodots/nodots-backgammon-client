import { useContext } from 'react'
import { Board, Player, Point, Rail, Off, CheckerBox, Color } from '../Models'
import { DieState, RollSurfaceState } from '../State/types/DieState'
import { CubeState } from '../State/types/CubeState.d'
import { GameAction } from '../State/types/GameAction'
import { GameContext } from '../State/Game.context'

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
    color: Color | undefined
    checkers: [
      {
        origin: CheckerBox | undefined
        destination: CheckerBox | undefined
        completed: boolean | undefined
      },
      {
        origin: CheckerBox | undefined
        destination: CheckerBox | undefined
        completed: boolean | undefined
      }
    ]
  }
  activeColor: Color
  roll: (actions: GameAction) => void
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

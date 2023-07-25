import { Board, Player, CheckerBox, Color } from '../../Models'
import { DieState, RollSurfaceState } from './die-state'
import { CubeState } from './cube-state'
import { GameAction } from './game-action'

export type GameState = {
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
  rename: (name: string) => any
  roll: (action: GameAction) => any
  move: (action: GameAction) => any
  finalizeMove: (color: Color) => any
  resetMove: (color: Color) => any
  toggleActivePlayer: () => any
  double: () => any
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

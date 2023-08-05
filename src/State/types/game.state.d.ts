import { Board, Player, Color } from '../../models'
import { DieState, RollSurfaceState } from './die.state'
import { CubeState } from './cube.state'
import { GameAction } from './game.action'
import { TurnState } from './turn.state'

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
  activeTurn: TurnState
  activeColor: Color
  rename: (name: string) => any
  roll: (action: GameAction) => any
  move: (action: GameAction) => any
  initializeTurn: (action: InitailizeTurnAction) => any
  finalizeTurn: (color: Color) => any
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

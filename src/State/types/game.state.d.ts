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
  cube: CubeState
  activeTurn: TurnState
  activeColor: Color
  move: (action: GameAction) => any
  initializeTurn: (action: InitailizeTurnAction) => any
  finalizeTurn: (color: Color) => any
  resetMove: (color: Color) => any
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
      checkerboxes: boolean
    }
  }
}

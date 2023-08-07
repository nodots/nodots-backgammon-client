import { Color } from '../models'
import { GameAction, InitializeTurnAction } from './types/game.action'
import { GameState } from './types/game.state'

export const enum GAME_ACTION_TYPE {
  RENAME,
  MOVE,
  INITIALIZE_TURN,
  FINALIZE_TURN,
  RESET_TURN,
  ROLL,
  ROLL_FOR_START,
  DOUBLE,
  RESIGN,
  TOGGLE
}

export const initGameState: GameState = initializeGame()

function initializeGame () {
  const blackPlayer = new Player({ firstName: 'A', lastName: 'Robot', color: 'black' })
  const whitePlayer = new Player({ firstName: 'Ken', lastName: 'Riley', color: 'white' })

  const game = new Game({ whitePlayer: blackPlayer, blackPlayer: whitePlayer })
  const winner = Game.rollForStart({ black: blackPlayer, white: whitePlayer })

  let blackPlayerCopy = blackPlayer
  let whitePlayerCopy = whitePlayer

  winner === 'black' ? blackPlayerCopy.active = true : whitePlayerCopy.active = true

  const initPlayers = {
    white: whitePlayerCopy,
    black: blackPlayerCopy
  }

  const initGameState: GameState = {
    board: game.board,
    players: initPlayers,
    cube: {
      value: 2,
      controllingColor: undefined
    },
    activeTurn: {
      id: undefined,
      status: undefined,
      player: undefined,
      roll: undefined,
      moves: [],
    },
    activeColor: winner,
    move: (action: GameAction) => { },
    initializeTurn: (action: InitializeTurnAction) => { },
    finalizeTurn: (color: Color) => { },
    resetMove: (color: Color) => { },
    double: () => { },
    debug: {
      isActive: false,
      components: {
        player: false,
        die: true,
        cube: false,
        rollSurface: false,
        quadrant: false,
        off: false,
        checkerboxes: false,
      }
    }
  }
  return initGameState
}

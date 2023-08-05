import { Game, Player, Die, Color } from '../models'
import { DieState } from './types/die.state'
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
    dice: {
      black: [
        new Die({ color: 'black', order: 0 }) as DieState,
        new Die({ color: 'black', order: 1 }) as DieState,
      ],
      white: [
        new Die({ color: 'white', order: 0 }) as DieState,
        new Die({ color: 'white', order: 1 }) as DieState,
      ]
    },
    rollSurfaces: {
      black: {
        id: game.board.rollSurfaces.black.id,
        color: game.board.rollSurfaces.black.color,
        dice: [
          {
            id: game.board.rollSurfaces.black.dice[0].id,
            order: game.board.rollSurfaces.black.dice[0].order,
            color: 'black',
            value: undefined,
            rollDie () { },
          },
          {
            id: game.board.rollSurfaces.black.dice[1].id,
            order: game.board.rollSurfaces.black.dice[1].order,
            color: 'black',
            value: undefined,
            rollDie () { }
          }
        ]
      },
      white: {
        id: game.board.rollSurfaces.white.id,
        color: game.board.rollSurfaces.white.color,
        dice: [
          {
            id: game.board.rollSurfaces.white.dice[0].id,
            order: game.board.rollSurfaces.white.dice[0].order,
            color: 'white',
            value: undefined,
            rollDie: () => { }
          },
          {
            id: game.board.rollSurfaces.white.dice[1].id,
            order: game.board.rollSurfaces.white.dice[1].order,
            color: 'white',
            value: undefined,
            rollDie () { }
          }
        ]
      },
    },
    activeTurn: {
      id: undefined,
      status: undefined,
      player: undefined,
      roll: undefined,
      moves: [],
    },
    activeColor: winner,
    rename: (name: string) => { },
    roll: (action: GameAction) => undefined,
    move: (action: GameAction) => { },
    initializeTurn: (action: InitializeTurnAction) => { },
    finalizeTurn: (color: Color) => { },
    resetMove: (color: Color) => { },
    double: () => { },
    toggleActivePlayer: () => { },
    debug: {
      isActive: false,
      components: {
        player: false,
        die: true,
        cube: false,
        rollSurface: false,
        quadrant: false,
        off: false,
        checkerBoxes: false,
      }
    }
  }
  return initGameState
}

import chalk from 'chalk'
import {
  NodotsPlayerDice,
  NodotsPlayerDiceActive,
  NodotsPlayersDiceBlack,
  NodotsPlayersDiceInactive,
  NodotsPlayersDiceWhite,
  NodotsRoll,
  initializing as initializingPlayersDice,
  roll,
  setPlayersDiceActive,
} from './Stores/Dice/Types'
import { NodotsPlay } from './Stores/Play/Types'
import {
  initializingPlayers,
  INodotsPlayers,
  NodotsPlayersInitializing,
  PlayerWinning,
  setPlayersActive,
} from './Stores/Player/Types'
import { buildBoard, NodotsBoard } from './types/Board'
import { NodotsChecker } from './types/Checker'
import { buildCube, NodotsCube } from './types/Cube'
import { NodotsDiceStore } from './Stores/Dice/Store'
import { generateId } from '../RootStore'
export const CHECKERS_PER_PLAYER = 15
export type PointPosition =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24

export type PlayerCheckers = [
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker
]

export type CheckerboxPosition = PointPosition | 'bar' | 'off'
export type OriginPosition = PointPosition | 'bar'
export type DestinationPosition = PointPosition | 'off'
export type NodotsColor = 'black' | 'white'
export type NodotsMoveDirection = 'clockwise' | 'counterclockwise'

export interface NodotsGame {
  id: string
}

export interface GameInitializing extends NodotsGame {
  kind: 'game-initializing'
}

export interface GameInitialized extends NodotsGame {
  kind: 'game-initialized'
  dice: NodotsPlayersDiceInactive
  players: NodotsPlayersInitializing
  board: NodotsBoard
  cube: NodotsCube
}

export interface GameRollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  players: NodotsPlayersInitializing
  dice: NodotsPlayersDiceInactive
  board: NodotsBoard
  cube: NodotsCube
}

export interface GamePlayingRolling extends NodotsGame {
  kind: 'game-playing-rolling'
  players: INodotsPlayers
  dice: NodotsPlayersDiceWhite | NodotsPlayersDiceBlack
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
  activePlay?: NodotsPlay
}

export interface GamePlayingMoving extends NodotsGame {
  kind: 'game-playing-moving'
  players: INodotsPlayers
  dice: NodotsPlayersDiceWhite | NodotsPlayersDiceBlack
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
  activePlay?: NodotsPlay
}

export interface GameCompleted extends NodotsGame {
  kind: 'game-completed'
  activeColor: NodotsColor
  board: NodotsBoard
  cube: NodotsCube
  roll: NodotsRoll
  players: INodotsPlayers
  winner: PlayerWinning
}

export type NodotsGameState =
  | GameInitializing
  | GameInitialized
  | GameRollingForStart
  | GamePlayingMoving
  | GamePlayingRolling
  | GameCompleted

export const initializing = (
  externalPlayers: INodotsPlayers
): GameInitialized => {
  const dice: NodotsPlayersDiceInactive = {
    black: {
      id: generateId(),
      kind: 'inactive',
      color: 'black',
      dice: [
        {
          id: generateId(),
          color: 'black',
          order: 0,
          value: 1,
        },
        {
          id: generateId(),
          color: 'black',
          order: 1,
          value: 1,
        },
      ],
    },
    white: {
      id: generateId(),
      kind: 'inactive',
      color: 'white',
      dice: [
        {
          id: generateId(),
          color: 'white',
          order: 0,
          value: 1,
        },
        {
          id: generateId(),
          color: 'white',
          order: 1,
          value: 1,
        },
      ],
    },
  }

  console.log(chalk.green('5. [Types: Game]'), externalPlayers)

  const transmogrifyPlayers = (
    externalPlayers: INodotsPlayers
  ): NodotsPlayersInitializing => {
    console.log(
      chalk.green(
        '6. [Types: Game] nodotsPlayers. Transmogrifies an impotent id and preferences for username, color, a direction to move from an outside source into a NodotsPlayer (also think about how this works with multiple games). "Preference" is important. This is ultimately just how the user views the board. But also need to think about different board implementations: remote:remote:noaudience, remote:remote:audience, remote:local:audience (I do not think order of remote local matter. But that could be a big mistake)'
      ),
      externalPlayers
    )

    return {
      kind: 'players-initializing',
      black: {
        ...externalPlayers.black,
        id: generateId(),
        kind: 'player-initializing',
        pipCount: 167,
      },
      white: {
        ...externalPlayers.white,
        id: generateId(),
        kind: 'player-initializing',
        pipCount: 167,
      },
    }
  }

  const players = transmogrifyPlayers(externalPlayers)
  const board = buildBoard(players)
  const cube = buildCube()
  return {
    id: generateId(),
    kind: 'game-initialized',
    dice,
    players,
    board,
    cube,
  }
}

export const rollingForStart = (
  diceStores: {
    black: NodotsDiceStore
    white: NodotsDiceStore
  },
  gameState: GameInitialized,
  players: NodotsPlayersInitializing
): GamePlayingRolling => {
  //+++++++++++++ THIS IS THE HANDOFF POINT BETWEEN THE CLIENT AND THE GAME STORE
  // NEED TO TRANSFORM EXTERNAL PLAYER TO NODOTS PLAYER
  return {
    ...gameState,
    kind: 'game-playing-rolling',
    activeColor: 'black',
    players,
    dice: {
      white: {
        id: generateId(),
        kind: 'inactive',
        color: 'white',
        dice: [
          {
            id: generateId(),
            color: 'white',
            order: 0,
            value: 1,
          },
          {
            id: generateId(),
            color: 'white',
            order: 1,
            value: 1,
          },
        ],
      },
      black: {
        id: generateId(),
        kind: 'active',
        color: 'black',
        dice: [
          {
            id: generateId(),
            color: 'black',
            order: 0,
            value: 1,
          },
          {
            id: generateId(),
            color: 'black',
            order: 1,
            value: 1,
          },
        ],
      },
    },
  }
}

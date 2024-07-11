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
export type MoveDirection = 'clockwise' | 'counterclockwise'

export interface NodotsGame {
  id: string
}

export interface GameInitializing extends NodotsGame {
  kind: 'game-initializing'
}

export interface GameInitialized extends NodotsGame {
  kind: 'game-initialized'
  dice: NodotsPlayersDiceInactive
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

export const initializing = (players: INodotsPlayers): GameInitialized => {
  return {
    id: generateId(),
    kind: 'game-initialized',
    players: initializingPlayers(players),
    dice: initializingPlayersDice(),
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

  const whiteRoll = roll()
  const blackRoll = roll()
  if (whiteRoll === blackRoll) {
    return rollingForStart(diceStores, gameState, players)
  }
  const activePlayerColor = blackRoll > whiteRoll ? 'black' : 'white'
  console.log(
    '[Types: Game] rollingForStart activePlayerColor:',
    activePlayerColor
  )
  console.log('[Types: Game] rollingForStart players:', players)
  console.log('[Types: Game] rollingForStart gameState:', gameState)

  // const id = gameState.id
  // const cube = buildCube()
  // const board = buildBoard(players)
  // const diceStates = {
  //   black: diceStores.black.diceState,
  //   white: diceStores.white.diceState,
  // }

  // return {
  //   ...gameState,
  //   kind: 'game-playing-rolling',

  // }
}

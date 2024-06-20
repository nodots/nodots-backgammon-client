import { NodotsBoard, buildBoard } from './types/Board'
import { NodotsPlay, NodotsPlayState } from './Stores/Play/Types'
import { NodotsCube } from './types/Cube'
import { Roll, rollDice, rollForStart } from './types/Dice'
import { v4 } from 'uuid'
import { NodotsChecker } from './types/Checker'
import {
  NodotsPlayers,
  PlayerMoving,
  PlayerRolling,
  PlayerWinning,
} from './Stores/Player/Types'
import { NodotsPlayStore } from './Stores/Play/Store'
import chalk from 'chalk'

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

export const generateId = (): string => v4()
export const generateTimestamp = (): string => new Date().toISOString()
export const changeActiveColor = (activeColor: NodotsColor): NodotsColor =>
  activeColor === 'black' ? 'white' : 'black'

export interface NodotsGame {
  kind:
    | 'game-initializing'
    | 'game-rolling-for-start'
    | 'game-playing-rolling'
    | 'game-playing-moving'
    | 'game-completed'
    | 'game-ready'
  id: string
  plays: NodotsPlay[]
}

export interface GameInitializing extends NodotsGame {
  kind: 'game-initializing'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
}

export interface GameRollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
}

export interface GameReady extends NodotsGame {
  kind: 'game-ready'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
}

export interface GamePlaying_Rolling extends NodotsGame {
  kind: 'game-playing-rolling'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
  activePlay?: NodotsPlay
}

export interface GamePlaying_Moving extends NodotsGame {
  kind: 'game-playing-moving'
  players: NodotsPlayers
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
  roll: Roll
  players: NodotsPlayers
  winner: PlayerWinning
}

export type NodotsGameState =
  | GameInitializing
  | GameReady
  | GameRollingForStart
  | GamePlaying_Moving
  | GamePlaying_Rolling
  | GameCompleted

export const initializing = (players: NodotsPlayers): GameRollingForStart => {
  console.log('[GameStore] initializing players:')
  console.log(
    chalk.green(
      `Bang a gong game is on!: ${players.black.username} v ${players.white.username})`
    )
  )
  const board = buildBoard(players)
  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }
  return {
    id: generateId(),
    kind: 'game-rolling-for-start',
    players,
    board,
    cube,
    plays: [],
  }
}

export const rollingForStart = (
  gameState: GameInitializing
): GamePlaying_Rolling => {
  const winner = rollForStart(gameState.players)
  console.log('[GameStore] rollingForStart winner:', winner)

  return {
    ...gameState,
    kind: 'game-playing-rolling',
    activeColor: winner.color,
  }
}

export const rolling = (
  gameState: GamePlaying_Rolling,
  player: PlayerRolling
): GamePlaying_Moving => {
  const { activeColor, players } = gameState
  players[activeColor] = player as unknown as PlayerMoving // FIXME

  return {
    ...gameState,
    kind: 'game-playing-moving',
    players,
  }
}

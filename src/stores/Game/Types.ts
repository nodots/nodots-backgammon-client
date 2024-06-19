import { NodotsBoard, buildBoard } from './types/Board'
import { NodotsPlay, NodotsPlayState } from './Stores/Play/Types'
import { NodotsCube } from './types/Cube'
import { Roll, rollForStart } from './types/Dice'
import { v4 } from 'uuid'
import { NodotsChecker } from './types/Checker'
import { NodotsPlayers, PlayerWinning } from './Stores/Player/Types'
import { NodotsPlayStore } from './Stores/Play/Store'

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
    | 'game-playing'
    | 'game-completed'
    | 'game-ready'
  id: string
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

export interface GamePlaying extends NodotsGame {
  kind: 'game-playing'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
  playStore: NodotsPlayStore
  plays?: NodotsPlay[]
}

export interface GameCompleted extends NodotsGame {
  kind: 'game-completed'
  activeColor: NodotsColor
  board: NodotsBoard
  cube: NodotsCube
  roll: Roll
  plays: NodotsPlay[]
  players: NodotsPlayers
  winner: PlayerWinning
}

export type NodotsGameState =
  | GameInitializing
  | GameReady
  | GameRollingForStart
  | GamePlaying
  | GameCompleted

export const initializing = (players: NodotsPlayers): GamePlaying => {
  console.log('[GameStore] initializing players:')
  console.log(`\t${players.black.username} v ${players.white.username}`)
  const board = buildBoard(players)
  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }
  const initialState: GameInitializing = {
    id: generateId(),
    kind: 'game-initializing',
    players,
    board,
    cube,
  }

  return rollingForStart(initialState)
}

export const rollingForStart = (state: GameInitializing): GamePlaying => {
  const { id, players, board, cube } = state
  const winner = rollForStart(state.players)
  console.log('[GameStore] rollingForStart winner:', winner)

  return {
    kind: 'game-playing',
    id,
    activeColor: winner.color,
    players,
    board,
    cube,
    playStore: new NodotsPlayStore(winner),
  }
}

import { NodotsBoard, buildBoard } from './types/Board'
import { NodotsPlay, NodotsPlayState } from './Stores/Play/Types'
import { NodotsCube } from './types/Cube'
import { v4 } from 'uuid'
import { NodotsChecker } from './types/Checker'
import { NodotsPlayers, PlayerWinning } from './Stores/Player/Types'
import chalk from 'chalk'
import {
  NodotsPlayerDiceInactive,
  NodotsPlayerDiceActive,
  NodotsRoll,
  initializing as initializingDice,
  roll,
  NodotsPlayersDiceInactive,
  NodotsPlayersDiceWhite,
  NodotsPlayersDiceBlack,
} from './Stores/Dice/Types'
import { NodotsDiceStore } from './Stores/Dice/Store'
import { NodotsGameStore } from './Store'

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
  dice: NodotsPlayersDiceInactive
  board: NodotsBoard
  cube: NodotsCube
}

export interface GameRollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  players: NodotsPlayers
  dice: NodotsPlayersDiceInactive
  board: NodotsBoard
  cube: NodotsCube
}

export interface GameReady extends NodotsGame {
  kind: 'game-ready'
  players: NodotsPlayers
  dice: NodotsPlayersDiceWhite | NodotsPlayersDiceBlack
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
}

export interface GamePlaying_Rolling extends NodotsGame {
  kind: 'game-playing-rolling'
  players: NodotsPlayers
  dice: NodotsPlayersDiceWhite | NodotsPlayersDiceBlack
  board: NodotsBoard
  cube: NodotsCube
  activeColor: NodotsColor
  activePlay?: NodotsPlay
}

export interface GamePlaying_Moving extends NodotsGame {
  kind: 'game-playing-moving'
  players: NodotsPlayers
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
  // console.log('[Store: Game] initializing players:')
  // console.log(
  //   chalk.green(
  //     `Bang a gong, game is on for ${players.black.username} v ${players.white.username}`
  //   )
  // )
  const id = generateId()
  const board = buildBoard(players)
  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const dice: NodotsPlayersDiceInactive = {
    black: initializingDice('black'),
    white: initializingDice('white'),
  }

  console.log('[Types: Game] initializing id:', id)

  return {
    kind: 'game-rolling-for-start',
    id,
    players,
    dice,
    board,
    cube,
    plays: [],
  }
}

export const rollingForStart = (
  gameStore: NodotsGameStore
): GamePlaying_Rolling => {
  const gameState = gameStore.state as GameRollingForStart
  const whiteRoll = roll()
  const blackRoll = roll()
  if (whiteRoll === blackRoll) {
    return rollingForStart(gameStore)
  }
  const activeColor = whiteRoll > blackRoll ? 'white' : 'black'
  const diceStores = gameStore.diceStores
  // console.log('[Types: Game] rollingForStart diceStores:', diceStores)
  const activeDiceStore = diceStores[activeColor]
  console.log(
    '[Types: Game] preparing to call activeDiceStore setActive for:',
    activeColor
  )
  activeDiceStore.setActive(
    activeDiceStore.diceState as NodotsPlayerDiceInactive
  )
  if (
    diceStores.black.diceState.kind === 'active' &&
    diceStores.white.diceState.kind === 'active'
  ) {
    console.error(
      `Both diceStates are active gameId: ${gameStore.state.id} whiteRoll = ${whiteRoll} blackRoll = ${blackRoll} activeColor = ${activeColor} gameStore:`,
      gameStore
    )
  }
  if (activeDiceStore.diceState.color === 'white') {
    return {
      ...gameState,
      kind: 'game-playing-rolling',
      activeColor,
      dice: {
        white: {
          color: 'white',
          kind: 'active',
          dice: activeDiceStore.diceState.dice,
        },
        black: {
          color: 'black',
          kind: 'inactive',
          dice: activeDiceStore.diceState.dice,
        },
      } as NodotsPlayersDiceWhite,
    }
  } else {
    return {
      ...gameState,
      kind: 'game-playing-rolling',
      activeColor,
      dice: {
        white: {
          color: 'white',
          kind: 'inactive',
          dice: activeDiceStore.diceState.dice,
        },
        black: {
          color: 'black',
          kind: 'active',
          dice: activeDiceStore.diceState.dice,
        },
      } as NodotsPlayersDiceBlack,
    }
  }
}

export const rolling = (
  gameState: GamePlaying_Rolling,
  diceStore: NodotsDiceStore
): GamePlaying_Moving => {
  const { activeColor, players, dice } = gameState
  const activeDice = dice[activeColor] as NodotsPlayerDiceActive
  // console.log('[Types: Game] rolling activeDice', activeDice)
  return {
    ...gameState,
    kind: 'game-playing-moving',
    players,
    dice,
  }
}

import { v4 as uuid } from 'uuid'
import { NodotsChecker } from './Game/types/Checker'
import { BOARD_IMPORT_DEFAULT } from '../board-setups'
import { NodotsBoard, buildBoard } from './Game/types/Board'
import { NodotsCube, double } from './Game/types/Cube'
import { Roll, generateDice, rollDice } from './Game/types/Dice'
import { NodotsMessage } from './Game/types/Message'
import { saveGameState, buildMoves } from './Move/helpers'
import { NodotsPlay, PlayInitializing, PlayMoving } from './Play/Types'
import {
  NodotsPlayers,
  PlayerPlaying,
  PlayerRolling,
  PlayerWinning,
} from './Player/Types'
import { GameCompleted, GameInitializing, NodotsGame } from './Game'
import {
  GameRolling,
  GameRolled,
  GameDoubled,
  GameMoving,
  GameDiceSwitched,
  GameConfirmingPlay,
} from './Game/types'

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
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'

export const generateId = (): string => uuid()
export const generateTimestamp = (): string => new Date().toISOString()
export const changeActiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'

export interface NodotsGameStateHistoryEvent {
  timestamp: string
  state: NodotsGame
}
export interface NodotsCheckercontainerImport {
  position: CheckerboxPosition
  checkercount: number
}

export type NodotsBoardImport = NodotsCheckercontainerImport[]

export interface NodotsBoardImports {
  clockwise: NodotsBoardImport
  counterclockwise: NodotsBoardImport
}
export const initializing = (players: NodotsPlayers): GameInitializing => {
  // reset stored state. Next iteration needs to recognize game/match ids
  // resetGameState()

  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)

  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const board = buildBoard(players, {
    clockwise: BOARD_IMPORT_DEFAULT,
    counterclockwise: BOARD_IMPORT_DEFAULT,
  })

  const results: GameInitializing = {
    kind: 'game-initializing',
    id: generateId(),
    players,
    board,
    cube,
    plays: [],
  }
  saveGameState(results)
  return results
}

export const rollingForStart = (state: GameInitializing): GameRolling => {
  const { players } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'black'
  const activePlayer = players[activeColor] as PlayerRolling
  const message = {
    game: `${activePlayer.username} wins the opening roll`,
  }

  const results: GameRolling = {
    ...state,
    kind: 'game-rolling',
    activeColor,
    message,
    roll: [1, 1], // FIXME
  }
  saveGameState(results)
  return results
}

export const rolling = (state: GameRolling): GameRolled => {
  const { activeColor, board, players } = state
  const player = players[activeColor] as PlayerPlaying

  const roll = rollDice()

  const moves = buildMoves(state, player, roll)

  const play: PlayInitializing = {
    id: generateId(),
    kind: 'play-initializing',
    player,
    roll,
    isAuto: player.automation.move,
    isForced: false,
    analysis: { options: [] },
    moves,
  }

  const game: GameRolled = {
    ...state,
    kind: 'game-rolled',
    roll,
    plays: [play],
  }
  return game
}

export const doubling = (state: GameRolling): GameDoubled => {
  const { cube, roll } = state
  cube.value = double(cube)
  const results: GameDoubled = {
    ...state,
    kind: 'game-doubled',
    cube,
    roll,
  }

  saveGameState(results)
  return results
}

export const moving = (
  state: GameRolled | GameMoving | GameDiceSwitched,
  checkerId: string
): GameMoving | GameConfirmingPlay | GameCompleted => {
  const { activeColor, players, board, plays } = state
  const player = players[activeColor] as PlayerPlaying
  const play = plays[plays.length - 1] as PlayMoving

  return {
    ...state,
    kind: 'game-moving',
  }
}

export const confirming = (state: GameConfirmingPlay): GameRolling => {
  const { activeColor } = state

  const results: GameRolling = {
    ...state,
    kind: 'game-rolling',
    activeColor: changeActiveColor(activeColor),
  }

  saveGameState(results)
  return results
}

export const reverting = (
  state: GameMoving | GameConfirmingPlay
): GameMoving | GameConfirmingPlay => {
  console.log('Reverting')
  console.log(state)
  // getCurrentPlay(state)
  return state
}

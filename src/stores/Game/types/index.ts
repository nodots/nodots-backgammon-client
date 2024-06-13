import { v4 as uuid } from 'uuid'
import { BOARD_IMPORT_DEFAULT } from '../../../board-setups'
import { NodotsBoard, buildBoard } from './Board'
import { NodotsChecker } from './Checker'
import { NodotsCube, double } from './Cube'
import { Roll, generateDice, isDoubles, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { NodotsPlayers, PlayerPlaying, PlayerWinning } from '../../Player/Types'
import { NodotsPlay } from '../../Play/Types'
import { buildMoves, saveGameState } from '../../Move/helpers'
import { NodotsGame } from '..'

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

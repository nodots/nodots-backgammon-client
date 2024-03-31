import { v4 as uuid } from 'uuid'
import { Player, generateDice } from './player'
import { BgApiPlayerBoard, BgWebApiPlay } from './integrations/bgweb-api'
import { Roll } from '../components/Die/state'
import NodotsGameStore from '.'

export const CHECKERS_PER_PLAYER = 15

export type Latitude = 'north' | 'south'
export type Longitude = 'east' | 'west'
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'
export type CheckerboxPosition = number | 'bar' | 'off'
export type GameErrorType =
  | 'Configuration'
  | 'Game'
  | 'Turn'
  | 'Move'
  | 'Roll'
  | 'Player'
  | 'Die'
  | 'Cube'
  | 'Checkerbox'
  | 'Quadrant'
  | 'Point'
  | 'RollSurface'

export type PlayerBoard = BgApiPlayerBoard
export type PlayerBoards = {
  white: PlayerBoard
  black: PlayerBoard
}

export const isColor = (c: unknown): c is Color => {
  if (c && typeof c === 'string' && (c === 'white' || c === 'black')) {
    return true
  }
  return false
}

export const generateId = (): string => uuid()

const rollForStart = (): Color => (Math.random() >= 0.5 ? 'black' : 'white')

export class GameError extends Error {
  model: GameErrorType
  constructor({
    model,
    errorMessage,
  }: {
    model?: GameErrorType
    errorMessage: string
  }) {
    super(errorMessage)
    this.model = model || 'Game'
  }
}

export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64
export type Cube = {
  value: CubeValue
  owner: Player | undefined
}

export interface Checker {
  color: Color
}

export interface Point {
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
  checkers: Color[]
}

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Quadrant {
  latitude: Latitude
  longitude: Longitude
  points: Point[]
}

export interface Bar {
  white: Checker[]
  black: Checker[]
}

export interface Off {
  white: Checker[]
  black: Checker[]
}

export interface Board {
  quadrants: {
    east: {
      north: Quadrant
      south: Quadrant
    }
    west: {
      north: Quadrant
      south: Quadrant
    }
  }
  bar: Bar
  off: Off
}

export interface Players {
  white: Player
  black: Player
}

// states
export interface Ready {
  kind: 'ready'
  game: NodotsGame
  board: Board
  cube: Cube
  players: Players
}

export interface Starting {
  kind: 'starting'
  game: NodotsGame
  board: Board
  cube: Cube
  players: Players
}

interface Rolling {
  kind: 'rolling'
  activePlayer: Player
  game: NodotsGame
  board: Board
  cube: Cube
  players: Players
}

interface Moving {
  kind: 'moving'
  game: NodotsGame
  board: Board
  player: Player
  cube: Cube
  roll: Roll
  moves: BgWebApiPlay[]
}

interface Confirming {
  kind: 'confirming'
  store: NodotsGameStore
  game: NodotsGame
  board: Board
  player: Player
  cube: Cube
  roll: Roll
  moves: BgWebApiPlay[]
}

export type NodotsGameState = Ready | Starting | Rolling | Moving | Confirming

export const ready = (players: Players): Starting => {
  const game = new NodotsGame(players)
  return {
    kind: 'starting',
    game,
    board: game.board,
    cube: game.cube,
    players,
  }
}

export const starting = (state: Starting): Rolling => {
  const { kind, game, players, ...previous } = state
  const winningColor = rollForStart()
  const activePlayer = players[winningColor]
  activePlayer.active = true
  return {
    kind: 'rolling',
    activePlayer,
    game: game,
    cube: game.cube,
    board: game.board,
    players,
  }
}

export class NodotsGame {
  private whitePlayer: Player
  private blackPlayer: Player
  activePlayer: Player | undefined
  players: Players
  playerBoards: PlayerBoards
  board: Board
  cube: Cube
  notificationMessage: string = ''

  defaultBoard: PlayerBoard = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 5,
    7: 0,
    8: 3,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 5,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 2,
    bar: 0,
  }

  constructor(players: Players) {
    this.whitePlayer = players.white

    this.whitePlayer.dice = generateDice(this.whitePlayer)

    this.blackPlayer = players.black
    this.blackPlayer.dice = generateDice(this.blackPlayer)

    this.players = {
      white: this.whitePlayer,
      black: this.blackPlayer,
    }

    this.cube = {
      value: 2,
      owner: undefined,
    }

    this.playerBoards = {
      white: this.defaultBoard,
      black: this.defaultBoard,
    }

    this.board = this.buildBoard()
  }

  setNotification = (message: string) => (this.notificationMessage = message)

  getPlayers = () => this.players

  getBoard = () => this.playerBoards

  getActivePlayer = (): Player =>
    this.players.black.active ? this.players.black : this.players.white

  getClockwisePlayer = (): Player =>
    this.players.black.moveDirection === 'clockwise'
      ? this.players.black
      : this.players.white

  getCounterclockwisePlayer = (): Player =>
    this.players.black.moveDirection === 'counterclockwise'
      ? this.players.black
      : this.players.white

  getPlayerForMoveDirection = (direction: MoveDirection): Player =>
    direction === 'clockwise'
      ? this.getClockwisePlayer()
      : this.getCounterclockwisePlayer()

  buildQuadrant = (
    start: number,
    latitude: Latitude,
    longitude: Longitude
  ): Quadrant => {
    const end = start + 6
    const points: Point[] = []

    const clockwisePlayer = this.getClockwisePlayer()
    const counterclockwisePlayer = this.getCounterclockwisePlayer()

    const clockwiseBoard = this.playerBoards[clockwisePlayer.color]
    const counterclockwiseBoard =
      this.playerBoards[counterclockwisePlayer.color]
    const clockwiseColor = clockwisePlayer.color
    const counterclockwiseColor = counterclockwisePlayer.color

    for (const positionLabel in clockwiseBoard) {
      const checkerCount = clockwiseBoard[positionLabel as keyof PlayerBoard]
      const checkers: Color[] = []
      if (positionLabel !== 'bar') {
        const position: number = parseInt(positionLabel)
        const counterclockwisePosition = 25 - position
        if (position >= start && position < end) {
          for (let i = 0; i < checkerCount; i++) {
            checkers.push(clockwiseColor)
          }
          const p: Point = {
            position: {
              clockwise: position,
              counterclockwise: counterclockwisePosition,
            },
            longitude,
            latitude,
            checkers,
          }
          points.push(p)
        }
      }
    }

    for (const positionLabel in counterclockwiseBoard) {
      const checkerCount =
        counterclockwiseBoard[positionLabel as keyof PlayerBoard]
      const checkers: Color[] = []
      if (positionLabel !== 'bar') {
        const counterclockwisePosition: number = parseInt(positionLabel)
        const clockwisePosition = 25 - counterclockwisePosition
        if (clockwisePosition >= start && clockwisePosition < end) {
          for (let i = 0; i < checkerCount; i++) {
            checkers.push(counterclockwiseColor)
          }
          const existingPoint = points.find((p) => {
            if (p.position.clockwise === clockwisePosition) {
              return p
            }
          })
          if (existingPoint) {
            if (existingPoint.checkers.length > 0 && checkers.length > 0) {
              console.error(
                'Existing point already has checkers:',
                existingPoint.checkers
              )
            }
            const existingPointIndex = points.indexOf(existingPoint)
            points[existingPointIndex].checkers.push(...checkers)
          }
        }
      }
    }

    return {
      latitude,
      longitude,
      points,
    }
  }

  buildBoard = (): Board => {
    return {
      quadrants: {
        east: {
          north: this.buildQuadrant(19, 'north', 'east'),
          south: this.buildQuadrant(1, 'south', 'east'),
        },
        west: {
          north: this.buildQuadrant(13, 'north', 'west'),
          south: this.buildQuadrant(7, 'south', 'west'),
        },
      },
      bar: {
        white: [],
        black: [],
      },
      off: {
        white: [],
        black: [],
      },
    }
  }
}

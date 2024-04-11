import { v4 as uuid } from 'uuid'
import { BgApiPlayerBoard } from './integrations/bgweb-api'
import { Player, generateDice, rollDice } from './player'
import { isObject } from 'mobx/dist/internal'

export const CHECKERS_PER_PLAYER = 15
export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type DieOrder = 0 | 1
export type CubeValue = 2 | 4 | 8 | 16 | 32 | 64
export type Roll = [DieValue, DieValue]
export type Latitude = 'north' | 'south'
export type Longitude = 'east' | 'west'
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'

export type PlayerBoard = BgApiPlayerBoard
export type PlayerBoards = {
  white: PlayerBoard
  black: PlayerBoard
}

export const generateId = (): string => uuid()

export interface Cube {
  value: CubeValue
  owner: Player | undefined
}

export interface Die {
  color: Color
  value: DieValue
  order: DieOrder
}

export type DiePair = [Die, Die]

export interface Checker {
  id: string
  color: Color
  locationId: string
}

export type Checkercontainer = {
  id: string
  kind: string
  checkers: Checker[]
}
export interface Point extends Checkercontainer {
  kind: 'point'
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
}

export interface Bar extends Checkercontainer {
  kind: 'bar'
  color: Color
}

export interface Off extends Checkercontainer {
  kind: 'off'
  color: Color
}

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Quadrant {
  latitude: Latitude
  longitude: Longitude
  points: Point[]
}

// export type OriginCheckercontainer = Point | Bar
// export type DestinationCheckercontainer = Point | Off

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
  bar: [Bar, Bar]
  off: [Off, Off]
}

export interface Players {
  white: Player
  black: Player
}

export interface NodotsMove {
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  dieValue: DieValue
}

export interface NodotsMessage {
  game?: string
  debug?: string
  players?: {
    white?: string
    black?: string
  }
}
export interface Ready {
  kind: 'ready'
  game: NodotsGame
  message?: NodotsMessage
}

export interface RollForStart {
  kind: 'roll-for-start'
  game: NodotsGame
  message?: NodotsMessage
}

export interface Rolling {
  kind: 'rolling'
  game: NodotsGame
  message?: NodotsMessage
}

export interface Moving {
  kind: 'moving'
  game: NodotsGame
  message?: NodotsMessage
}

export interface Confirming {
  kind: 'confirming'
  game: NodotsGame
  message?: NodotsMessage
}

export type NodotsGameState =
  | Ready
  | Rolling
  | RollForStart
  | Moving
  | Confirming

export const ready = (players: Players): Ready => {
  const game = new NodotsGame(players)

  return {
    kind: 'ready',
    game,
  }
}

export const rollForStart = (state: Ready): RollForStart => {
  const { game } = state
  const { players } = game
  game.activeColor = Math.random() >= 0.5 ? 'black' : 'white'
  const message = {
    game: `${game.players[game.activeColor].username} wins the opening roll`,
  }

  return {
    kind: 'roll-for-start',
    game,
    message,
  }
}

export const rolling = (state: Rolling | RollForStart): Rolling => {
  const { game } = state
  const { players, activeColor } = game
  if (!activeColor) {
    throw new Error('No active color')
  }
  const activePlayer = players[activeColor]
  if (!activePlayer) {
    throw new Error(`No active player or color`)
  }

  game.roll = rollDice(activePlayer)
  const message = {
    game: `${game.players[activeColor].username} rolls ${JSON.stringify(
      game.roll
    )}`,
    debug: `${JSON.stringify(state)} ${activeColor}`,
  }

  return {
    kind: 'rolling',
    game,
    message,
  }
}

export const switchDice = (state: Rolling): Rolling => {
  const { game } = state
  const { cube, board, players, activeColor, roll } = game
  if (!activeColor) {
    throw new Error('No activecolor')
  }
  const activePlayer = players[activeColor]
  if (
    !game.roll ||
    typeof game.roll === undefined ||
    game.roll.length !== 2 ||
    game.roll[0] === undefined ||
    game.roll[1] === undefined
  ) {
    throw new Error('No roll')
  }
  game.roll = [game.roll[1], game.roll[0]]

  return {
    kind: 'rolling',
    game,
    message: {
      game: `${activePlayer.username} swaps dice ${JSON.stringify(game.roll)}`,
      debug: JSON.stringify(game.activeColor),
    },
  }
}

export const double = (state: NodotsGameState) => {
  const { kind, game } = state
  const { board, players, activeColor, roll, moves } = game
  if (!activeColor) {
    throw new Error('No activecolor')
  }
  const activePlayer = players[activeColor]
  game.cube.value =
    game.cube.value !== 64
      ? ((game.cube.value * 2) as CubeValue)
      : game.cube.value
  return {
    kind,
    game,
    messages: {
      game: `${activePlayer.username} doubles to ${game.cube.value}`,
      debug: game.activeColor,
    },
  }
}

export const moving = (state: Rolling | Moving, checkerId: string) => {
  const { game } = state
  const { activeColor, players, roll } = game
  if (!activeColor) {
    throw Error('No activeColor for game')
  }
  if (roll[0] === undefined || roll[1] === undefined) {
    throw Error('No roll baby')
  }
  const activePlayer = players[activeColor]
  const checker = game.getChecker(checkerId)

  if (activePlayer.color !== checker.color) {
    const errorMessage = `Not ${
      players[checker.color].username
    }'s checker to move`
    const message: NodotsMessage = {
      players: {
        white: checker.color === 'white' ? errorMessage : undefined,
        black: checker.color === 'black' ? errorMessage : undefined,
      },
    }
    notify(state, message)
  }

  let originPoint: Point | undefined
  let originBar: Bar | undefined

  try {
    originPoint = game.getOriginPointById(checker.locationId)
  } catch (e: any) {
    originBar = game.board.bar.find((bar) => bar.id === checker.locationId)
  }

  if (!originPoint && !originBar) {
    throw new Error(`Could not find origin`)
  }

  if (game.moves[0] === undefined && game.roll[0]) {
    if (originPoint) {
      const destinationPoint = game.getDestinationPointFromOriginPoint(
        originPoint,
        game.roll[0],
        activePlayer
      )

      const firstMove: NodotsMove = {
        from: originPoint,
        to: destinationPoint,
        dieValue: roll[0],
      }
      const nextMove: NodotsMove = {
        from: undefined,
        to: undefined,
        dieValue: roll[1],
      }

      game.moves = [firstMove, nextMove]

      if (game.roll[0] === game.roll[1]) {
        game.moves.push(nextMove, nextMove)
      }

      return {
        kind: 'moving',
        game,
      }
    } else if (originBar) {
      console.log(originBar)
    }
  }

  return state
}

export const confirming = (state: Confirming): Rolling => {
  const { game } = state
  const { activeColor, players, board, cube, roll, moves } = game
  return {
    kind: 'rolling',
    game,
    message: {
      game: `Move confirmed by ${activeColor}`,
      debug: `confirming activeColor = ${
        activeColor === 'black' ? 'white' : 'black'
      }`,
    },
  }
}

export const notify = (
  state: NodotsGameState,
  messages: NodotsMessage
): NodotsGameState => {
  const { kind, game } = state
  const { board, cube, players, activeColor, moves, roll } = game

  return {
    kind,
    game,
    message: {
      game: messages.game,
      debug: messages.debug,
      players: {
        white: messages?.players?.white,
        black: messages?.players?.black,
      },
    },
  }
}

export interface NodotsLog {
  gameId: string
  state: NodotsGameState
  timestamp: Date
  message: string
}
export class NodotsGame {
  id: string
  private whitePlayer: Player
  private blackPlayer: Player
  activeColor: Color | undefined
  players: Players
  playerBoards: PlayerBoards
  board: Board
  cube: Cube
  checkers: Checker[]
  log: NodotsLog[]
  roll: Roll | [undefined, undefined]
  moves:
    | [NodotsMove, NodotsMove]
    | [NodotsMove, NodotsMove, NodotsMove, NodotsMove]
    | [undefined, undefined]

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
    this.id = generateId()
    this.log = []

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
    this.moves = [undefined, undefined]
    this.roll = [undefined, undefined]
    this.board = this.buildBoard()
    this.checkers = this.getCheckers()
  }

  getPlayers = () => this.players

  getBoard = () => this.playerBoards

  getActivePlayer = (): Player =>
    this.activeColor === 'black' ? this.players.black : this.players.white

  getNewActivePlayer = (): Player =>
    this.activeColor === 'black' ? this.players.white : this.players.black

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

  getCheckercontainers = () => {
    const checkercontainers = [
      ...this.board.quadrants.east.north.points,
      ...this.board.quadrants.east.south.points,
      ...this.board.quadrants.west.north.points,
      ...this.board.quadrants.west.south.points,
      this.board.bar[0],
      this.board.bar[1],
      this.board.off[0],
      this.board.off[1],
    ]
    return checkercontainers
  }

  getCheckers = (): Checker[] => {
    const checkercontainers = this.getCheckercontainers()
    const checkers: Checker[] = []

    checkercontainers.map((checkercontainer) =>
      checkers.push(...checkercontainer.checkers)
    )
    return checkers
  }

  getChecker = (id: string): Checker => {
    const checker = this.getCheckers().find((checker) => checker.id === id)
    if (!checker) {
      throw Error(`No checker found for ${id}`)
    }
    return checker
  }

  getPoints = (): Point[] => [
    ...this.board.quadrants.east.north.points,
    ...this.board.quadrants.east.south.points,
    ...this.board.quadrants.west.north.points,
    ...this.board.quadrants.west.south.points,
  ]

  getOriginPointById = (id: string): Point => {
    const point = this.getPoints().find((point) => point.id === id)
    if (!point) {
      throw new Error(`Could not find point for id ${id}`)
    }
    return point
  }

  getCheckercontainerById = (id: string): Checkercontainer => {
    const container = this.getCheckercontainers().find((c) => c.id === id)
    if (!container) {
      throw Error(`No checkercontainer found for ${id}`)
    }
    return container
  }

  getDestinationPointFromOriginPoint = (
    origin: Point,
    dieValue: DieValue,
    player: Player
  ): Point => {
    const originPosition = origin.position[player.moveDirection]
    const destinationPosition = originPosition + dieValue

    const destination = this.getPoints().find(
      (point) => point.position[player.moveDirection] === destinationPosition
    )

    if (!destination) {
      throw new Error(
        `Could not find destination from origin: ${JSON.stringify(origin)}`
      )
    }

    return destination
  }

  buildQuadrant = (
    start: 1 | 7 | 13 | 19,
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
      const checkers: Checker[] = []
      if (positionLabel !== 'bar') {
        const pointId = generateId()
        const position: number = parseInt(positionLabel)
        const counterclockwisePosition = 25 - position
        if (position >= start && position < end) {
          for (let i = 0; i < checkerCount; i++) {
            checkers.push({
              id: generateId(),
              color: clockwiseColor,
              locationId: pointId,
            })
          }
          const p: Point = {
            id: pointId,
            kind: 'point',
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
      const checkers: Checker[] = []
      if (positionLabel !== 'bar') {
        const counterclockwisePosition: number = parseInt(positionLabel)
        const clockwisePosition = 25 - counterclockwisePosition
        if (clockwisePosition >= start && clockwisePosition < end) {
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
            for (let i = 0; i < checkerCount; i++) {
              checkers.push({
                id: generateId(),
                color: counterclockwiseColor,
                locationId: existingPoint.id,
              })
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
      bar: [
        { kind: 'bar', id: generateId(), color: 'white', checkers: [] },
        { kind: 'bar', id: generateId(), color: 'black', checkers: [] },
      ],
      off: [
        { kind: 'off', id: generateId(), color: 'white', checkers: [] },
        { kind: 'off', id: generateId(), color: 'black', checkers: [] },
      ],
    }
  }
}

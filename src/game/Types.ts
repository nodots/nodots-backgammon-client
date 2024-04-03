import { v4 as uuid } from 'uuid'
import { BgApiPlayerBoard } from './integrations/bgweb-api'
import { Player, generateDice, rollDice } from './player'

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

const rollForStart = (): Color => (Math.random() >= 0.5 ? 'black' : 'white')

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

export interface Point {
  id: string
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
  checkers: Checker[]
}

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Quadrant {
  latitude: Latitude
  longitude: Longitude
  points: Point[]
}

export interface Bar {
  white: {
    id: string
    checkers: Checker[]
  }
  black: {
    id: string
    checkers: Checker[]
  }
}

export interface Off {
  white: {
    id: string
    checkers: Checker[]
  }
  black: {
    id: string
    checkers: Checker[]
  }
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

export interface NodotsMove {
  from: Point | undefined
  to: Point | undefined
  dieValue: DieValue
}

export interface Ready {
  kind: 'ready'
  game: NodotsGame
  board: Board
  cube: Cube
  activePlayer: Player
  players: Players
  roll: Roll
  moves: NodotsMove[]
  gameNotification?: string
}

export interface Rolling {
  kind: 'rolling'
  activePlayer: Player
  game: NodotsGame
  board: Board
  cube: Cube
  players: Players
  roll: Roll
  moves: NodotsMove[]
  gameNotification?: string
}

export interface Moving {
  kind: 'moving'
  game: NodotsGame
  board: Board
  activePlayer: Player
  players: Players
  cube: Cube
  roll: Roll
  moves: NodotsMove[]
  gameNotification?: string
}

export interface Confirming {
  kind: 'confirming'
  game: NodotsGame
  board: Board
  activePlayer: Player
  players: Players
  cube: Cube
  roll: Roll
  moves: NodotsMove[]
  gameNotification?: string
}

export type NodotsGameState = Ready | Rolling | Moving

export const ready = (players: Players): Ready => {
  const game = new NodotsGame(players)
  const winningColor = rollForStart()
  const activePlayer = players[winningColor]
  activePlayer.active = true
  return {
    kind: 'ready',
    game,
    board: game.board,
    cube: game.cube,
    players,
    activePlayer,
    roll: [1, 1],
    moves: [],
    gameNotification: `${activePlayer.username} wins the opening roll`,
  }
}

export const rolling = (state: Ready): Rolling => {
  const { game, activePlayer, players } = state
  const roll = rollDice(activePlayer)
  return {
    kind: 'rolling',
    game,
    board: game.board,
    cube: game.cube,
    activePlayer,
    roll,
    moves: [],
    gameNotification: `${activePlayer.username} rolls ${JSON.stringify(roll)}`,
    players,
  }
}

export const switchDice = (state: Rolling): Rolling => {
  const { game, activePlayer, players, roll } = state
  const { cube, board } = game
  const switchedRoll: Roll = [roll[1], roll[0]]
  return {
    kind: 'rolling',
    game,
    board,
    cube,
    players,
    activePlayer,
    roll: switchedRoll,
    moves: [],
    gameNotification: `${activePlayer.username} swaps dice ${JSON.stringify(
      switchedRoll
    )}`,
  }
}

export const double = (state: NodotsGameState) => {
  const { kind, cube, game, board, players, activePlayer, roll, moves } = state
  cube.value = cube.value !== 64 ? ((cube.value * 2) as CubeValue) : cube.value
  return {
    kind,
    game,
    board,
    cube,
    players,
    activePlayer,
    roll,
    moves,
    gameNotification: `${activePlayer.username} doubles to ${cube.value}`,
  }
}

export const moving = (state: Rolling | Moving, locationId: string): Moving => {
  const { cube, game, board, players, activePlayer, roll, moves } = state
  const origin = game.getCheckercontainerById(locationId)
  if (moves.length === 0) {
    moves[0] = {
      from: origin,
      to: undefined,
      dieValue: roll[0],
    }
    moves[1] = {
      from: undefined,
      to: undefined,
      dieValue: roll[1],
    }
    // Handle doubles. 2x the moves!
    if (roll[0] === roll[1]) {
      moves[2] = {
        from: undefined,
        to: undefined,
        dieValue: roll[0],
      }
      moves[3] = {
        from: undefined,
        to: undefined,
        dieValue: roll[1],
      }
    }
  }

  let notification = 'Fucked up move'
  const activeMove = moves.find(
    (m) => m.from !== undefined && m.to === undefined
  )
  if (activeMove && activeMove.from) {
    const relativePosition =
      activeMove.from.position[activePlayer.moveDirection]

    const newPosition = relativePosition - activeMove.dieValue

    const destination = game.getCheckercontainerByDirectionAndPosition(
      activePlayer.moveDirection,
      newPosition
    )

    if (
      (destination && origin && destination.checkers.length === 0) ||
      destination?.checkers[0].color === activePlayer.color
    ) {
      notification = `${activePlayer.username} moves from ${
        origin?.position[activePlayer.moveDirection]
      } to ${destination?.position[activePlayer.moveDirection]}`
      if (origin && destination) {
        const checkerToMove = origin.checkers.pop()
        if (checkerToMove) {
          destination.checkers.push(checkerToMove)
        }
      }
    } else {
      notification = `${activePlayer.username} CANNOT move from ${
        origin?.position[activePlayer.moveDirection]
      } to ${destination?.position[activePlayer.moveDirection]}`
    }
  }
  return {
    kind: 'moving',
    game,
    board,
    cube,
    players,
    activePlayer,
    roll,
    moves,
    gameNotification: notification,
  }
}

export const notify = (
  state: NodotsGameState,
  message: string
): NodotsGameState => {
  const { kind, game, board, cube, players, activePlayer, moves, roll } = state
  return {
    kind,
    game,
    board,
    cube,
    players,
    activePlayer,
    roll,
    moves,
    gameNotification: message,
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

  getCheckercontainers = () => {
    const checkercontainers = [
      ...this.board.quadrants.east.north.points,
      ...this.board.quadrants.east.south.points,
      ...this.board.quadrants.west.north.points,
      ...this.board.quadrants.west.south.points,
      // this.board.bar.black,
      // this.board.bar.white,
    ]
    return checkercontainers
  }

  getCheckercontainerById = (id: string): Point | undefined => {
    const containers = this.getCheckercontainers()
    const container = containers.find((c) => c.id === id)
    if (container) {
      return container
    }
  }

  getCheckercontainerByDirectionAndPosition = (
    direction: MoveDirection,
    position: number
  ) => {
    const containers = this.getCheckercontainers()
    const container = containers.find((c) => c.position[direction] === position)
    if (container) {
      return container
    }
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
      bar: {
        white: {
          id: generateId(),
          checkers: [],
        },
        black: {
          id: generateId(),
          checkers: [],
        },
      },
      off: {
        white: {
          id: generateId(),
          checkers: [],
        },
        black: {
          id: generateId(),
          checkers: [],
        },
      },
    }
  }
}

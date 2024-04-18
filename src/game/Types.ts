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

export interface Checker {
  id: string
  color: Color
  locationId: string
}

export const whiteBoard: PlayerBoard = {
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

export const blackBoard: PlayerBoard = {
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

export const getActivePlayer = (activeColor: Color, players: Players): Player =>
  activeColor === 'black' ? players.black : players.white

const getNewActiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'

export const getClockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'counterclockwise'
    ? players.black
    : players.white

const getPlayerForMoveDirection = (
  players: Players,
  direction: MoveDirection
): Player =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

const getCheckercontainers = (board: Board) => {
  const checkercontainers = [
    ...board.quadrants.east.north.points,
    ...board.quadrants.east.south.points,
    ...board.quadrants.west.north.points,
    ...board.quadrants.west.south.points,
    board.bar[0],
    board.bar[1],
    board.off[0],
    board.off[1],
  ]
  return checkercontainers
}

const getCheckers = (board: Board): Checker[] => {
  const checkercontainers = getCheckercontainers(board)
  const checkers: Checker[] = []

  checkercontainers.map((checkercontainer) =>
    checkers.push(...checkercontainer.checkers)
  )
  return checkers
}

export const getCheckersForColor = (board: Board, color: Color): Checker[] =>
  getCheckers(board).filter((checker) => checker.color === color)

const getChecker = (board: Board, id: string): Checker => {
  const checker = getCheckers(board).find((checker) => checker.id === id)
  if (!checker) {
    throw Error(`No checker found for ${id}`)
  }
  return checker
}

const getPoints = (board: Board): Point[] => [
  ...board.quadrants.east.north.points,
  ...board.quadrants.east.south.points,
  ...board.quadrants.west.north.points,
  ...board.quadrants.west.south.points,
]

const getOriginPointById = (board: Board, id: string): Point => {
  const point = getPoints(board).find((point) => point.id === id)
  if (!point) {
    throw new Error(`Could not find point for id ${id}`)
  }
  return point
}

const getCheckercontainerById = (
  board: Board,
  id: string
): Checkercontainer => {
  const container = getCheckercontainers(board).find((c) => c.id === id)
  if (!container) {
    throw Error(`No checkercontainer found for ${id}`)
  }
  return container
}

const getDestinationPointFromOriginPoint = (
  board: Board,
  origin: Point,
  dieValue: DieValue,
  player: Player
): Point => {
  console.log(player.moveDirection)
  const originPosition = origin.position[player.moveDirection]
  // console.log(origin.position)
  const destinationPosition = originPosition + dieValue

  const destination = getPoints(board).find(
    (point) => point.position[player.moveDirection] === destinationPosition
  )

  if (!destination) {
    throw new Error(
      `Could not find destination from origin: ${JSON.stringify(origin)}`
    )
  }

  return destination
}

const buildQuadrant = (
  start: 1 | 7 | 13 | 19,
  latitude: Latitude,
  longitude: Longitude,
  players: Players,
  checkers: NodotsGameCheckers
): Quadrant => {
  const end = start + 6
  const points: Point[] = []

  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color
  const clockwiseCheckers = checkers[clockwiseColor]
  let usedClockwiseCheckers = 0

  const clockwiseBoard = players[clockwiseColor].board
  const counterclockwiseBoard = players[counterclockwiseColor].board
  const counterclockwiseCheckers = checkers[counterclockwiseColor]
  let usedCounterclockwiseCheckers = 0

  for (const positionLabel in clockwiseBoard) {
    const checkerCount = clockwiseBoard[positionLabel as keyof PlayerBoard]
    if (positionLabel !== 'bar') {
      const pointId = generateId()
      const position: number = parseInt(positionLabel)
      const counterclockwisePosition = 25 - position
      if (position >= start && position < end) {
        const pointCheckers = clockwiseCheckers.slice(
          usedClockwiseCheckers,
          checkerCount
        )
        usedClockwiseCheckers = usedClockwiseCheckers + checkerCount
        pointCheckers.map((checker) => (checker.locationId = pointId))
        const p: Point = {
          id: pointId,
          kind: 'point',
          position: {
            clockwise: position,
            counterclockwise: counterclockwisePosition,
          },
          longitude,
          latitude,
          checkers: pointCheckers,
        }
        points.push(p)
      }
    }
  }
  for (const positionLabel in counterclockwiseBoard) {
    const checkerCount =
      counterclockwiseBoard[positionLabel as keyof PlayerBoard]

    if (positionLabel !== 'bar') {
      const counterclockwisePosition: number = parseInt(positionLabel)
      const clockwisePosition = 25 - counterclockwisePosition
      if (clockwisePosition >= start && clockwisePosition < end) {
        const existingPoint = points.find(
          (p) => p.position.counterclockwise === counterclockwisePosition
        )
        const pointCheckers = counterclockwiseCheckers.slice(
          usedCounterclockwiseCheckers,
          checkerCount
        )

        if (!existingPoint) {
          throw new Error(
            `No point at counterclockwisePosition ${counterclockwisePosition}`
          )
        }
        usedCounterclockwiseCheckers =
          usedCounterclockwiseCheckers + checkerCount
        pointCheckers.map((checker) => (checker.locationId = existingPoint.id))

        if (existingPoint && pointCheckers.length) {
          existingPoint.checkers = pointCheckers
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

const buildBoard = (players: Players, checkers: NodotsGameCheckers): Board => {
  return {
    quadrants: {
      east: {
        north: buildQuadrant(19, 'north', 'east', players, checkers),
        south: buildQuadrant(1, 'south', 'east', players, checkers),
      },
      west: {
        north: buildQuadrant(13, 'north', 'west', players, checkers),
        south: buildQuadrant(7, 'south', 'west', players, checkers),
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

export type PlayerBoard = BgApiPlayerBoard
export type PlayerBoards = {
  white: PlayerBoard
  black: PlayerBoard
}

export const generateId = (): string => uuid()

export interface Cube {
  id: string
  value: CubeValue
  owner: Player | undefined
}

export interface Die {
  color: Color
  value: DieValue
  order: DieOrder
}

export type DiePair = [Die, Die]

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

export type NodotsMoves =
  | [NodotsMove, NodotsMove]
  | [NodotsMove, NodotsMove, NodotsMove, NodotsMove]

export interface NodotsMessage {
  game?: string
  debug?: string
  players?: {
    white?: string
    black?: string
  }
}

export type PlayerCheckers = [
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker,
  Checker
]

interface NodotsGameCheckers {
  white: PlayerCheckers
  black: PlayerCheckers
}

interface NodotsGame {
  kind:
    | 'initializing'
    | 'ready'
    | 'rolling-for-start'
    | 'rolling'
    | 'doubling'
    | 'confirming'
    | 'moving'
  board: Board
  players: Players
  checkers: {}
  cube: Cube
  message?: NodotsMessage
}

export interface Initializing extends NodotsGame {
  kind: 'initializing'
}

export interface Ready extends NodotsGame {
  kind: 'ready'
  activeColor: Color
}
export interface RollingForStart extends NodotsGame {
  kind: 'rolling-for-start'
  activeColor: Color
}
export interface Rolling extends NodotsGame {
  kind: 'rolling'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Moving extends NodotsGame {
  kind: 'moving'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Confirming extends NodotsGame {
  kind: 'confirming'
  game: NodotsGame
  activeColor: Color
  roll: Roll
  message?: NodotsMessage
}

export const buildCheckersForColor = (color: Color): PlayerCheckers => {
  const checkers: Checker[] = []
  for (let i = 0; i < CHECKERS_PER_PLAYER; i++) {
    const checker: Checker = {
      id: generateId(),
      color,
      locationId: '',
    }
    checkers.push(checker)
  }
  if (checkers.length !== CHECKERS_PER_PLAYER) {
    throw new Error(`Invalid number of checkers for player ${checkers.length}`)
  }
  return checkers as PlayerCheckers
}

export type NodotsGameState =
  | Initializing
  | Ready
  | RollingForStart
  | Rolling
  | Moving
  | Confirming

export const initializing = (players: Players): Initializing => {
  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)
  players.black.board = blackBoard
  players.white.board = whiteBoard

  const checkers: NodotsGameCheckers = {
    white: buildCheckersForColor('white'),
    black: buildCheckersForColor('black'),
  }

  const cube: Cube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const board = buildBoard(players, checkers)

  return {
    kind: 'initializing',
    players,
    board,
    cube,
    checkers,
  }
}

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const rollingForStart = (state: Initializing): Ready => {
  const { players, board, cube, checkers } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'white'
  const message = {
    game: `${players[activeColor].username} wins the opening roll`,
  }

  return {
    kind: 'ready',
    activeColor,
    players,
    board,
    cube,
    checkers,
    message,
  }
}

export const rolling = (state: Ready): Rolling => {
  const { players, board, cube, activeColor, checkers } = state
  const activePlayer = players[activeColor]

  const roll = rollDice(players[activeColor])

  const move1: NodotsMove = {
    from: undefined,
    to: undefined,
    dieValue: roll[0],
  }
  const move2: NodotsMove = {
    from: undefined,
    to: undefined,
    dieValue: roll[1],
  }

  const moves:
    | [NodotsMove, NodotsMove]
    | [NodotsMove, NodotsMove, NodotsMove, NodotsMove] = [move1, move2]
  roll[0] === roll[1] ?? moves.push(...moves)

  const message = {
    game: `${activePlayer.username} rolls ${JSON.stringify(roll)}`,
    debug: `${JSON.stringify(state)} ${activeColor}`,
  }

  return {
    kind: 'rolling',
    activeColor,
    roll,
    moves,
    players,
    board,
    checkers,
    cube,
    message,
  }
}

export const switchDice = (state: Rolling): Rolling => {
  const { cube, board, players, activeColor, roll, moves, checkers } = state
  const activePlayer = players[activeColor]

  return {
    kind: 'rolling',
    roll: [roll[1], roll[0]],
    activeColor,
    moves,
    players,
    board,
    cube,
    checkers,
    message: {
      game: `${activePlayer.username} swaps dice ${JSON.stringify(roll)}`,
      debug: JSON.stringify(activeColor),
    },
  }
}

export const double = (state: Rolling | Moving): Rolling | Moving => {
  const { kind, board, players, activeColor, roll, cube, moves, checkers } =
    state

  const activePlayer = players[activeColor]

  cube.value = cube.value !== 64 ? ((cube.value * 2) as CubeValue) : cube.value
  return {
    kind,
    cube,
    activeColor,
    board,
    checkers,
    players,
    roll,
    moves,
    message: {
      game: `${activePlayer.username} doubles to ${cube.value}`,
      debug: activeColor,
    },
  }
}

export const moving = (
  state: Rolling | Moving,
  checkerId: string
): Moving | Confirming => {
  const { board, players, cube, activeColor, moves, roll, checkers } = state
  const activePlayer = players[activeColor]
  const nextMove = getNextMove(moves)
  const checker = getChecker(board, checkerId)
  const origin = getCheckercontainerById(board, checker.locationId)

  if (!nextMove) {
    throw new Error('No nextMove')
  }

  if (origin.kind === 'point') {
    const destination = getDestinationPointFromOriginPoint(
      board,
      origin as Point,
      nextMove.dieValue,
      activePlayer
    )

    origin.checkers = origin.checkers.filter(
      (checker) => checker.id !== checkerId
    )
    destination.checkers.push(checker)

    nextMove.from = origin
    nextMove.to = destination
    return {
      kind: 'moving',
      board,
      players,
      cube,
      checkers,
      activeColor,
      moves,
      roll,
    }
  }
  return {
    kind: 'moving',
    board,
    players,
    cube,
    checkers,
    activeColor,
    moves,
    roll,
  }
}

export const confirming = (state: Moving): Ready => {
  const { board, players, cube, checkers, activeColor } = state

  return {
    kind: 'ready',
    activeColor: getNewActiveColor(activeColor),
    board,
    players,
    cube,
    checkers,
  }
}

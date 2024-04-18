import { v4 as uuid } from 'uuid'
import {
  Board,
  blackBoard,
  buildBoard,
  getChecker,
  getCheckercontainerById,
  whiteBoard,
} from './Board'
import { getDestinationPointFromOriginPoint } from './Move'
import { NodotsGameCheckers, buildCheckersForColor } from './Checker'
import { Point } from './Checkercontainer'
import { Cube, CubeValue } from './Cube'
import { Roll, generateDice, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { NodotsMove, NodotsMoves, getNextMove } from './Move'
import { Players } from './Player'

export const CHECKERS_PER_PLAYER = 15
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'

export const generateId = (): string => uuid()
export const getNewActiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'

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
  checkers: NodotsGameCheckers
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

import { v4 as uuid } from 'uuid'
import { NodotsBoardStore, buildNodotsBoardStore } from './Board'
import { Checker } from './Checker'
import { Cube, CubeValue } from './Cube'
import { Roll, generateDice, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { Players } from './Player'
import { NodotsMoves, move, getNextMove, Initialized } from './move'

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

export type CheckerboxPosition = PointPosition | 'bar' | 'off'
export type OriginPosition = PointPosition | 'bar'
export type DestinationPosition = PointPosition | 'off'
export type Color = 'black' | 'white'
export type MoveDirection = 'clockwise' | 'counterclockwise'

export const generateId = (): string => uuid()
export const changeActiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'
export const getInactiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'

interface NodotsGame {
  kind:
    | 'initializing'
    | 'ready'
    | 'rolling-for-start'
    | 'rolling'
    | 'rolled'
    | 'doubling'
    | 'confirming'
    | 'moving'
  boardStore: NodotsBoardStore
  players: Players
  cube: Cube
  message?: NodotsMessage
}

export interface Initializing extends NodotsGame {
  kind: 'initializing'
}
export interface RollingForStart extends NodotsGame {
  kind: 'rolling-for-start'
  activeColor: Color
}
export interface Rolling extends NodotsGame {
  kind: 'rolling'
  activeColor: Color
}

export interface Rolled extends NodotsGame {
  kind: 'rolled'
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
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
  message?: NodotsMessage
}

export type NodotsGameState =
  | Initializing
  | RollingForStart
  | Rolling
  | Rolled
  | Moving
  | Confirming

export const initializing = (players: Players): Initializing => {
  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)

  const cube: Cube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const boardStore = buildNodotsBoardStore(players)

  return {
    kind: 'initializing',
    players,
    boardStore,
    cube,
  }
}

export const rollingForStart = (state: Initializing): Rolling => {
  const { players, boardStore, cube } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'white'
  const message = {
    game: `${players[activeColor].username} wins the opening roll`,
  }

  return {
    kind: 'rolling',
    activeColor,
    players,
    boardStore,
    cube,
    message,
  }
}

export const rolling = (state: Rolling): Rolled => {
  const { players, boardStore, cube, activeColor } = state
  const activePlayer = players[activeColor]

  const roll = rollDice()
  const moves: NodotsMoves = [
    {
      from: undefined,
      to: undefined,
      dieValue: roll[0],
    },
    {
      from: undefined,
      to: undefined,
      dieValue: roll[1],
    },
  ]
  if (roll[0] === roll[1]) {
    moves.push({
      from: undefined,
      to: undefined,
      dieValue: roll[0],
    })
    moves.push({
      from: undefined,
      to: undefined,
      dieValue: roll[1],
    })
  }

  const message = {
    game: `${activePlayer.username} rolls ${JSON.stringify(roll)}`,
    debug: `MOVES: ${moves.map((move) => move.dieValue)}`,
  }

  return {
    kind: 'rolled',
    activeColor,
    roll,
    moves,
    players,
    boardStore,
    cube,
    message,
  }
}

export const switchDice = (state: Rolled): Rolled => {
  const { cube, boardStore, players, roll, activeColor, moves } = state
  const activePlayer = players[activeColor]

  if (roll[0] === roll[1]) return state

  const newRoll: Roll = [roll[1], roll[0]]
  moves[0].dieValue = newRoll[0]
  moves[1].dieValue = newRoll[1]

  return {
    kind: 'rolled',
    roll: newRoll,
    activeColor,
    moves,
    players,
    boardStore,
    cube,
    message: {
      game: `${activePlayer.username} swaps dice ${JSON.stringify(newRoll)}`,
    },
  }
}

export const double = (state: Rolled | Moving): Rolled | Moving => {
  const { kind, boardStore, players, activeColor, roll, cube, moves } = state
  const activePlayer = players[activeColor]

  cube.value = cube.value !== 64 ? ((cube.value * 2) as CubeValue) : cube.value
  return {
    kind,
    cube,
    activeColor,
    boardStore,
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
  state: Rolled | Moving,
  checkerId: string
): Moving | Confirming => {
  const { activeColor, players, boardStore, moves } = state
  const player = players[activeColor]

  const moveState: Initialized = {
    kind: 'initialized',
    player,
    moves,
    board: boardStore,
  }

  move(moveState, checkerId)

  return {
    ...state,
    kind: 'moving',
  }
}

export const confirming = (state: Moving): Rolling => {
  const { activeColor } = state

  return {
    ...state,
    kind: 'rolling',
    activeColor: changeActiveColor(activeColor),
  }
}

export const debugging = (
  state: NodotsGameState,
  messageText: string
): NodotsGameState => {
  return {
    ...state,
    message: {
      debug: `${messageText}`,
    },
  }
}

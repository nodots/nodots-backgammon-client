import { v4 as uuid } from 'uuid'
import { NodotsBoardStore, buildBoard, getPipCounts } from './Board'
import { Checker } from './Checker'
import { Cube, CubeValue } from './Cube'
import { Roll, generateDice, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { MovingPlayer, NodotsPlayers, WinningPlayer } from './Player'
import { NodotsMoves, Initialized, buildMoveMessage, move } from './move'
import {
  BOARD_IMPORT_ALL_ACE,
  BOARD_IMPORT_ALL_OFF,
  BOARD_IMPORT_BEAR_OFF,
  BOARD_IMPORT_DEFAULT,
  BOARD_IMPORT_END_GAME,
  BOARD_IMPORT_REENTER,
} from '../board-setups'

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

export interface NodotsCheckercontainerImport {
  position: CheckerboxPosition
  checkercount: number
}

export type NodotsBoardImport = NodotsCheckercontainerImport[]

export interface NodotsBoardImports {
  clockwise: NodotsBoardImport
  counterclockwise: NodotsBoardImport
}

interface NodotsGame {
  kind:
    | 'initializing'
    | 'ready'
    | 'rolling-for-start'
    | 'rolling'
    | 'rolled'
    | 'moving'
    | 'confirming'
    | 'confirmed'
    | 'doubling'
    | 'completed'

  boardStore: NodotsBoardStore
  players: NodotsPlayers
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
}

export interface Confirmed extends NodotsGame {
  kind: 'confirmed'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Completed extends NodotsGame {
  kind: 'completed'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
  winner: WinningPlayer
}

export type NodotsGameState =
  | Initializing
  | RollingForStart
  | Rolling
  | Rolled
  | Moving
  | Confirming
  | Confirmed
  | Completed

export const initializing = (players: NodotsPlayers): Initializing => {
  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)

  const cube: Cube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const boardStore = buildBoard(players, {
    clockwise: BOARD_IMPORT_DEFAULT,
    counterclockwise: BOARD_IMPORT_DEFAULT,
  })

  return {
    kind: 'initializing',
    players,
    boardStore,
    cube,
  }
}

export const rollingForStart = (state: Initializing): Rolling => {
  const { players } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'white'
  const activePlayer = players[activeColor]
  activePlayer.kind = 'moving'
  const message = {
    game: `${activePlayer.username} wins the opening roll`,
  }

  return {
    ...state,
    kind: 'rolling',
    activeColor,
    message,
  }
}

// TODO: Refactor to eliminate "undefined" via MoveState
export const rolling = (state: Rolling): Rolled => {
  const { players, activeColor } = state
  const activePlayer = players[activeColor]

  const roll = rollDice()
  const moves: NodotsMoves = [
    {
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[0],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    },
    {
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[1],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    },
  ]
  if (roll[0] === roll[1]) {
    moves.push({
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[0],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    })
    moves.push({
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[1],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    })
  }

  const isDouble = () => {
    return roll[0] === roll[1] ? true : false
  }

  const message = {
    game: `${activePlayer.username} rolls ${roll[0]} ${roll[1]}${
      isDouble() ? '*' : ''
    }`,
    debug: `MOVES: ${moves.map((move) => move.dieValue)}`,
  }

  return {
    ...state,
    kind: 'rolled',
    roll,
    moves,
    message,
  }
}

export const switchDice = (state: Rolled): Rolled => {
  const { players, roll, activeColor, moves } = state
  const activePlayer = players[activeColor]

  if (roll[0] === roll[1]) return state

  const newRoll: Roll = [roll[1], roll[0]]
  moves[0].dieValue = newRoll[0]
  moves[1].dieValue = newRoll[1]

  return {
    ...state,
    kind: 'rolled',
    roll: newRoll,
    message: {
      game: `${activePlayer.username} switches dice to ${newRoll[0]} ${newRoll[1]}`,
    },
  }
}

export const double = (state: Rolled | Moving): Rolled | Moving => {
  const { players, activeColor, cube } = state
  const activePlayer = players[activeColor]

  cube.value = cube.value !== 64 ? ((cube.value * 2) as CubeValue) : cube.value
  return {
    ...state,
    cube,
    message: {
      game: `${activePlayer.username} doubles to ${cube.value}`,
      debug: activeColor,
    },
  }
}

export const moving = (
  state: Rolled | Moving,
  checkerId: string
): Moving | Confirming | Completed => {
  const { activeColor, players, boardStore, moves } = state
  const player = players[activeColor] as MovingPlayer

  const moveState: Initialized = {
    kind: 'initialized',
    player,
    moves,
    board: boardStore,
  }

  const results = move(moveState, checkerId)
  const remainingMoves = results.moves.filter(
    (move) => move.from === undefined
  ).length

  const pipCounts = getPipCounts(boardStore, players)
  players.white.pipCount = pipCounts.white
  players.black.pipCount = pipCounts.black

  const message = buildMoveMessage(player, moves)

  if (results.kind === 'completed') {
    const winner = player as unknown as WinningPlayer // FIXME

    return {
      ...state,
      kind: 'completed',
      winner,
      players,
      message: {
        game: `${winner.username} wins the game!`,
      },
    }
  } else {
    return {
      ...state,
      kind: remainingMoves === 0 ? 'confirming' : 'moving',
      boardStore: results.board,
      moves: results.moves,
      players,
      message,
    }
  }
}

export const confirming = (state: Confirming): Rolling => {
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

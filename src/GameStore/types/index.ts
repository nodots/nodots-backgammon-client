import { v4 as uuid } from 'uuid'
import { BOARD_IMPORT_DEFAULT } from '../board-setups'
import { NodotsBoardStore, buildBoard, getPipCounts } from './Board'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Roll, generateDice, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import {
  MovingPlayer,
  NodotsPlayer,
  NodotsPlayers,
  WinningPlayer,
} from './Player'
import { MoveInitialized, NodotsMove, NodotsMoves, move } from './move'
import { buildMoveMessage } from './Message'

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
    | 'game-initializing'
    | 'game-rolling-for-start'
    | 'game-rolling'
    | 'game-rolled'
    | 'game-moving'
    | 'game-confirming'
    | 'game-confirmed'
    | 'game-completed'

  boardStore: NodotsBoardStore
  players: NodotsPlayers
  cube: Cube
  message?: NodotsMessage
}

export interface Initializing extends NodotsGame {
  kind: 'game-initializing'
}

export interface RollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  activeColor: Color
}

export interface Rolling extends NodotsGame {
  kind: 'game-rolling'
  activeColor: Color
}

export interface Rolled extends NodotsGame {
  kind: 'game-rolled'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Moving extends NodotsGame {
  kind: 'game-moving'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Confirming extends NodotsGame {
  kind: 'game-confirming'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Confirmed extends NodotsGame {
  kind: 'game-confirmed'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Completed extends NodotsGame {
  kind: 'game-completed'
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
    kind: 'game-initializing',
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
    kind: 'game-rolling',
    activeColor,
    message,
  }
}

// Refactor to eliminate undefineds and fix type issue with return
const buildMoves = (roll: Roll, activePlayer: NodotsPlayer): NodotsMoves => {
  const moves = [
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
  return moves
}

export const rolling = (state: Rolling): Rolled => {
  const { players, activeColor } = state
  const activePlayer = players[activeColor]

  const roll = rollDice()
  const moves = buildMoves(roll, activePlayer)

  const isDouble = () => {
    return roll[0] === roll[1] ? true : false
  }

  return {
    ...state,
    kind: 'game-rolled',
    roll,
    moves,
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
    kind: 'game-rolled',
    roll: newRoll,
    message: {
      game: `${activePlayer.username} switches dice to ${newRoll[0]} ${newRoll[1]}`,
    },
  }
}

export const moving = (
  state: Rolled | Moving,
  checkerId: string
): Moving | Confirming | Completed => {
  const { activeColor, players, boardStore, moves } = state
  const player = players[activeColor] as MovingPlayer

  const moveState: MoveInitialized = {
    kind: 'move-initialized',
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

  if (results.kind === 'move-completed') {
    const winner = player as unknown as WinningPlayer // FIXME

    return {
      ...state,
      kind: 'game-completed',
      winner,
      players,
      message: {
        game: `${winner.username} wins the game!`,
      },
    }
  } else {
    return {
      ...state,
      kind: remainingMoves === 0 ? 'game-confirming' : 'game-moving',
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
    kind: 'game-rolling',
    activeColor: changeActiveColor(activeColor),
  }
}

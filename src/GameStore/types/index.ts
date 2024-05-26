import { v4 as uuid } from 'uuid'
import { BOARD_IMPORT_DEFAULT } from '../board-setups'
import { NodotsBoardStore, buildBoard, getPipCounts } from './Board'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Roll, generateDice, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { MovingPlayer, NodotsPlayers, WinningPlayer } from './Player'
import { MoveInitialized, NodotsMove, NodotsMoves, move } from './move'
import { buildMoveMessage } from './Message'
import { saveGameState } from './move/helpers'
import { buildMoves } from './move/helpers'

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

  board: NodotsBoardStore
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
  // reset stored state. Next iteration needs to recognize game/match ids
  // resetGameState()

  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)

  const cube: Cube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const board = buildBoard(players, {
    clockwise: BOARD_IMPORT_DEFAULT,
    counterclockwise: BOARD_IMPORT_DEFAULT,
  })

  const results: Initializing = {
    kind: 'game-initializing',
    players,
    board,
    cube,
  }
  saveGameState(results)
  return results
}

export const rollingForStart = (state: Initializing): Rolling => {
  const { players } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'white'
  const activePlayer = players[activeColor]
  activePlayer.kind = 'moving'
  const message = {
    game: `${activePlayer.username} wins the opening roll`,
  }

  const results: Rolling = {
    ...state,
    kind: 'game-rolling',
    activeColor,
    message,
  }
  saveGameState(results)
  return results
}

export const rolling = (state: Rolling): Rolled => {
  const { players, activeColor } = state
  const activePlayer = players[activeColor]

  const roll = rollDice()
  const moves = buildMoves(roll, activePlayer)

  const results: Rolled = {
    ...state,
    kind: 'game-rolled',
    roll,
    moves,
  }

  saveGameState(results)
  return results
}

export const switchingDice = (state: Rolled): Rolled => {
  const { players, roll, activeColor, moves } = state
  const activePlayer = players[activeColor]

  if (roll[0] === roll[1]) return state

  const newRoll: Roll = [roll[1], roll[0]]
  moves[0].dieValue = newRoll[0]
  moves[1].dieValue = newRoll[1]

  const results: Rolled = {
    ...state,
    kind: 'game-rolled',
    roll: newRoll,
    message: {
      game: `${activePlayer.username} switches dice to ${newRoll[0]} ${newRoll[1]}`,
    },
  }
  saveGameState(results)
  return results
}

export const moving = (
  state: Rolled | Moving,
  checkerId: string
): Moving | Confirming | Completed => {
  const { activeColor, players, board: boardStore, moves } = state
  const player = players[activeColor] as MovingPlayer

  const moveState: MoveInitialized = {
    kind: 'move-initialized',
    player,
    moves,
    board: boardStore,
  }

  const moveResults = move(moveState, checkerId, players)

  const remainingMoves = moveResults.moves.filter(
    (move) => move.from === undefined
  ).length

  const message = buildMoveMessage(player, moves)

  if (moveResults.kind === 'move-completed') {
    const winner = player as unknown as WinningPlayer // FIXME

    const results: Completed = {
      ...state,
      kind: 'game-completed',
      winner,
      players,
      message: {
        game: `${winner.username} wins the game!`,
      },
    }
    saveGameState(results)
    return results
  } else {
    const results: Moving | Confirming = {
      ...state,
      kind: remainingMoves === 0 ? 'game-confirming' : 'game-moving',
      board: moveResults.board,
      moves: moveResults.moves,
      players,
      message,
    }
    saveGameState(results)
    return results
  }
}

export const confirming = (state: Confirming): Rolling => {
  const { activeColor } = state

  const results: Rolling = {
    ...state,
    kind: 'game-rolling',
    activeColor: changeActiveColor(activeColor),
  }

  saveGameState(results)
  return results
}

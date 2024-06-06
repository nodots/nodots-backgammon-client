import { v4 as uuid } from 'uuid'
import { BOARD_IMPORT_DEFAULT } from '../board-setups'
import { NodotsBoardStore, buildBoard } from './Board'
import { Checker } from './Checker'
import { Cube, double } from './Cube'
import { Roll, generateDice, rollDice, rollDiceWithMoves } from './Dice'
import { NodotsMessage } from './Message'
import { MovingPlayer, NodotsPlayers, WinningPlayer } from './Player'
import { MoveInitialized, NodotsMoves, move } from './move'
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
export const generateTimestamp = (): string => new Date().toISOString()
export const changeActiveColor = (activeColor: Color): Color =>
  activeColor === 'black' ? 'white' : 'black'

export interface NodotsGameStateHistoryEvent {
  timestamp: string
  state: NodotsGameState
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

interface NodotsGame {
  kind:
    | 'game-initializing'
    | 'game-rolling-for-start'
    | 'game-rolling'
    | 'game-rolled'
    | 'game-doubling'
    | 'game-doubled'
    | 'game-dice-switched'
    | 'game-moving'
    | 'game-moved'
    | 'game-confirming-play'
    | 'game-play-confirmed'
    | 'game-completed'
  id: string
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
  roll: Roll
}

export interface Rolled extends NodotsGame {
  kind: 'game-rolled'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface Doubling extends NodotsGame {
  kind: 'game-doubling'
  activeColor: Color
  roll: Roll
}

export interface Doubled extends NodotsGame {
  kind: 'game-doubled'
  activeColor: Color
  roll: Roll
}

export interface DiceSwitched extends NodotsGame {
  kind: 'game-dice-switched'
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

export interface Moved extends NodotsGame {
  kind: 'game-moved'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface ConfirmingPlay extends NodotsGame {
  kind: 'game-confirming-play'
  activeColor: Color
  roll: Roll
  moves: NodotsMoves
}

export interface PlayConfirmed extends NodotsGame {
  kind: 'game-play-confirmed'
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
  | Doubling
  | Doubled
  | DiceSwitched
  | Moving
  | ConfirmingPlay
  | PlayConfirmed
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
    id: generateId(),
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
    roll: [1, 1], // FIXME
  }
  saveGameState(results)
  return results
}

export const rolling = (state: Rolling): Rolled => {
  const { players, board, activeColor } = state
  const activePlayer = players[activeColor]

  const rollResults = rollDiceWithMoves(board, activePlayer)

  const results: Rolled = {
    ...state,
    kind: 'game-rolled',
    roll: rollResults.roll,
    moves: rollResults.moves as NodotsMoves,
  }

  saveGameState(results)
  return results
}

export const doubling = (state: Rolling): Doubled => {
  const { cube, roll } = state
  cube.value = double(cube)
  const results: Doubled = {
    ...state,
    kind: 'game-doubled',
    cube,
    roll,
  }

  saveGameState(results)
  return results
}

export const switchingDice = (
  state: Rolled | DiceSwitched
): DiceSwitched | Rolled => {
  const { players, roll, activeColor, moves } = state
  const activePlayer = players[activeColor]

  if (roll[0] === roll[1]) return state

  const newRoll: Roll = [roll[1], roll[0]]
  moves[0].dieValue = newRoll[0]
  moves[1].dieValue = newRoll[1]

  const results: DiceSwitched = {
    ...state,
    kind: 'game-dice-switched',
    roll: newRoll,
    message: {
      game: `${activePlayer.username} switches dice to ${newRoll[0]} ${newRoll[1]}`,
    },
  }
  saveGameState(results)
  return results
}

export const moving = (
  state: Rolled | Moving | DiceSwitched,
  checkerId: string
): Moving | ConfirmingPlay | Completed => {
  const { activeColor, players, board, moves } = state
  const player = players[activeColor] as MovingPlayer

  const moveState: MoveInitialized = {
    kind: 'move-initialized',
    player,
    moves,
    board,
  }

  const moveResults = move(moveState, checkerId, players)

  const remainingMoves = moveResults.moves.filter(
    (move) => move.from === undefined
  ).length

  const message = buildMoveMessage()

  // FIXME: This is still in the wrong place.
  if (board.off[player.color].checkers.length === CHECKERS_PER_PLAYER) {
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
    const results: Moving | ConfirmingPlay = {
      ...state,
      kind: remainingMoves === 0 ? 'game-confirming-play' : 'game-moving',
      board: moveResults.board,
      moves: moveResults.moves,
      players,
      message,
    }
    saveGameState(results)
    return results
  }
}

export const confirming = (state: ConfirmingPlay): Rolling => {
  const { activeColor } = state

  const results: Rolling = {
    ...state,
    kind: 'game-rolling',
    activeColor: changeActiveColor(activeColor),
  }

  saveGameState(results)
  return results
}

export const reverting = (
  state: Moving | ConfirmingPlay
): Moving | ConfirmingPlay => {
  console.log('Reverting')
  console.log(state)
  // getCurrentPlay(state)
  return state
}

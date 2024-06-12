import { v4 as uuid } from 'uuid'
import { BOARD_IMPORT_DEFAULT } from '../../../board-setups'
import { NodotsBoard, buildBoard } from './Board'
import { NodotsChecker } from './Checker'
import { NodotsCube, double } from './Cube'
import { Roll, generateDice, isDoubles, rollDice } from './Dice'
import { NodotsMessage } from './Message'
import { NodotsPlayers, PlayerPlaying, PlayerWinning } from '../../Player/Types'
import { NodotsPlay } from '../../Play/Types'
import { buildMoves, saveGameState } from '../../Move/helpers'

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
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker,
  NodotsChecker
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
  board: NodotsBoard
  players: NodotsPlayers
  cube: NodotsCube
  plays: NodotsPlay[]
  message?: NodotsMessage
}

export interface GameInitializing extends NodotsGame {
  kind: 'game-initializing'
}

export interface GameRollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  activeColor: Color
}

export interface GameRolling extends NodotsGame {
  kind: 'game-rolling'
  activeColor: Color
  roll: Roll
}

export interface GameRolled extends NodotsGame {
  kind: 'game-rolled'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameDoubling extends NodotsGame {
  kind: 'game-doubling'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameDoubled extends NodotsGame {
  kind: 'game-doubled'
  activeColor: Color
  roll: Roll
  cube: NodotsCube
  plays: NodotsPlay[]
}

export interface GameDiceSwitched extends NodotsGame {
  kind: 'game-dice-switched'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameMoving extends NodotsGame {
  kind: 'game-moving'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameMoved extends NodotsGame {
  kind: 'game-moved'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameConfirmingPlay extends NodotsGame {
  kind: 'game-confirming-play'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GamePlayConfirmed extends NodotsGame {
  kind: 'game-play-confirmed'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameCompleted extends NodotsGame {
  kind: 'game-completed'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
  winner: PlayerWinning
}

export type NodotsGameState =
  | GameInitializing
  | GameRollingForStart
  | GameRolling
  | GameRolled
  | GameDoubling
  | GameDoubled
  | GameDiceSwitched
  | GameMoving
  | GameConfirmingPlay
  | GamePlayConfirmed
  | GameCompleted

export const initializing = (players: NodotsPlayers): GameInitializing => {
  // reset stored state. Next iteration needs to recognize game/match ids
  // resetGameState()

  players.black.dice = generateDice(players.black)
  players.white.dice = generateDice(players.black)

  const cube: NodotsCube = {
    id: generateId(),
    value: 2,
    owner: undefined,
  }

  const board = buildBoard(players, {
    clockwise: BOARD_IMPORT_DEFAULT,
    counterclockwise: BOARD_IMPORT_DEFAULT,
  })

  const results: GameInitializing = {
    kind: 'game-initializing',
    id: generateId(),
    players,
    board,
    cube,
    plays: [],
  }
  saveGameState(results)
  return results
}

export const rollingForStart = (state: GameInitializing): GameRolling => {
  const { players } = state
  const activeColor = Math.random() >= 0.5 ? 'black' : 'black'
  const activePlayer = players[activeColor] as PlayerPlaying
  const message = {
    game: `${activePlayer.username} wins the opening roll`,
  }

  const results: GameRolling = {
    ...state,
    kind: 'game-rolling',
    activeColor,
    message,
    roll: [1, 1], // FIXME
  }
  saveGameState(results)
  return results
}

export const rolling = (state: GameRolling): GameRolled => {
  const { activeColor, board, players } = state
  const player = players[activeColor] as PlayerPlaying

  const roll = rollDice()

  const moves = buildMoves(state, player, roll)

  const play: NodotsPlay = {
    id: generateId(),
    player,
    roll,
    isAuto: player.automation.move,
    isForced: false,
    analysis: { options: [] },
    moves,
  }

  const game: GameRolled = {
    ...state,
    kind: 'game-rolled',
    roll,
    plays: [play],
  }
  return game
}

export const doubling = (state: GameRolling): GameDoubled => {
  const { cube, roll } = state
  cube.value = double(cube)
  const results: GameDoubled = {
    ...state,
    kind: 'game-doubled',
    cube,
    roll,
  }

  saveGameState(results)
  return results
}

export const moving = (
  state: GameRolled | GameMoving | GameDiceSwitched,
  checkerId: string
): GameMoving | GameConfirmingPlay | GameCompleted => {
  const { activeColor, players, board, plays } = state
  const player = players[activeColor] as PlayerPlaying
  const play = plays[plays.length - 1]

  return {
    ...state,
    kind: 'game-moving',
  }

  // export type NodotsPlay = {
  //   id: string
  //   kind:
  //     | 'play-initializing'
  //     | 'play-active'
  //     | 'play-completed-partial'
  //     | 'play-completed-success'
  //   player: NodotsPlayer
  //   roll: Roll
  //   isAuto: boolean
  //   isForced: boolean
  //   analysis: {
  //     options: []
  //   }
  //   moves: NodotsMove[] // FIXME: this should either be an array of 2 or 4 moves
  // }

  // const moveResults = move(play, state, checkerId, players)

  // if (!moveResults) {
  //   throw Error('No move results')
  // }

  // const remainingMoves = moveResults.moves.filter(
  //   (move) => move.from === undefined
  // ).length

  // const message = buildMoveMessage()

  // // FIXME: This is still in the wrong place.
  // if (board.off[player.color].checkers.length === CHECKERS_PER_PLAYER) {
  //   const winner = player as unknown as WinningPlayer // FIXME

  //   const results: GameCompleted = {
  //     ...state,
  //     kind: 'game-completed',
  //     winner,
  //     players,
  //     message: {
  //       game: `${winner.username} wins the game!`,
  //     },
  //   }
  //   saveGameState(results)
  //   return results
  // } else {
  //   const results: GameMoving | GameConfirmingPlay = {
  //     ...state,
  //     kind: remainingMoves === 0 ? 'game-confirming-play' : 'game-moving',
  //     board: moveResults.board,
  //     players,
  //     message,
  //   }
  //   saveGameState(results)
  //   return results
  // }
}

export const confirming = (state: GameConfirmingPlay): GameRolling => {
  const { activeColor } = state

  const results: GameRolling = {
    ...state,
    kind: 'game-rolling',
    activeColor: changeActiveColor(activeColor),
  }

  saveGameState(results)
  return results
}

export const reverting = (
  state: GameMoving | GameConfirmingPlay
): GameMoving | GameConfirmingPlay => {
  console.log('Reverting')
  console.log(state)
  // getCurrentPlay(state)
  return state
}

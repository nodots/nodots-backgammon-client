import { MoveDirection } from '..'
import { NodotsBoardStore, getCheckercontainers } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Checkercontainer } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { NodotsMessage } from '../Message'
import { MovingPlayer, NodotsPlayers, Player, WinningPlayer } from '../Player'
import { bearOff } from './BearOff'
import { hit } from './Hit'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'
import {
  getDestinationForOrigin,
  getNextMove,
  isMoveHit,
  isMoveSane,
} from './helpers'

// TODO: Implement revert move
// TODO: Implement forced moves
export interface NodotsMove {
  checker: Checker | undefined
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  player: Player
  dieValue: DieValue
  direction: MoveDirection
  completed: boolean
}

export type NodotsMoves =
  | [NodotsMove, NodotsMove]
  | [NodotsMove, NodotsMove, NodotsMove, NodotsMove]

interface MoveState {
  player: MovingPlayer
  board: NodotsBoardStore
  moves: NodotsMoves
}

export interface MoveInitialized extends MoveState {
  kind: 'move-initialized'
}

export interface MoveMoving extends MoveState {
  kind: 'move-moving'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface MoveMoved extends MoveState {
  kind: 'move-moved'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface MoveCompleted extends MoveState {
  kind: 'move-completed'
  winner: WinningPlayer
  board: NodotsBoardStore
  player: MovingPlayer
  moves: NodotsMoves
}

export interface MoveNoMove extends MoveState {
  kind: 'move-no-move'
  message: NodotsMessage
}
export interface MoveError extends MoveState {
  kind: 'move-error'
  message: NodotsMessage
}

export type NodotsMoveState =
  | MoveInitialized
  | MoveMoved
  | MoveMoving
  | MoveCompleted
  | MoveError
  | MoveNoMove

export interface NodotsMovePayload {
  state: NodotsMoveState
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  moves: NodotsMove[]
  move: NodotsMove
  players: NodotsPlayers
}

export const move = (
  state: NodotsMoveState,
  checkerId: string,
  players: NodotsPlayers
): MoveMoving | MoveMoved | MoveCompleted | MoveError | MoveNoMove => {
  const { board, moves, player } = state

  const checker = getChecker(board, checkerId)
  const activeMove = getNextMove(moves) as NodotsMove

  const origin = getCheckercontainers(board).find((checkercontainer) =>
    checkercontainer.checkers.find((checker) => checker.id === checkerId)
  ) as Checkercontainer

  const destination = getDestinationForOrigin(state, origin, activeMove)

  if (!destination) {
    return {
      ...state,
      kind: 'move-no-move',
      player: player as MovingPlayer, // FIXME
      message: {
        game: `Could not find destination for origin`,
      },
    }
  }

  const payload: NodotsMovePayload = {
    state,
    checker,
    origin,
    destination,
    moves,
    move: activeMove,
    players,
  }

  if (!isMoveSane(payload)) {
    return {
      ...state,
      kind: 'move-error',
      player: player as MovingPlayer,
      message: {
        game: `Move is not sane`,
      },
    }
  }

  // This took a while to figure out: Hitting is really not part of move flow, it's its own thing.
  // So, take care of it now and move on to the rest of the move.
  if (isMoveHit(payload)) {
    hit(state, destination)
  }

  switch (origin.kind) {
    case 'point':
      switch (destination.kind) {
        case 'point':
          return pointToPoint(payload)
        case 'off':
        default:
          return bearOff(payload)
      }
    case 'bar':
      return reenter(payload)
    default:
      throw Error(`Unknown origin.kind ${origin.kind}`)
  }
}

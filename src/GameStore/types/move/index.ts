import checker from 'vite-plugin-checker'
import { MoveDirection, generateTimestamp } from '..'
import { NodotsBoardStore, getCheckercontainers } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Bar, Checkercontainer, Off, Point } from '../Checkercontainer'
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
  getOriginsForColor,
  isMoveHit,
  isMoveSane,
} from './helpers'

// TODO: Implement revert move
// TODO: Implement forced moves
export interface NodotsMove {
  id: string
  checker: Checker | undefined
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  player: Player
  dieValue: DieValue
  direction: MoveDirection
  completed: boolean
  timestamp: string
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

export interface MoveMovedSucceded extends MoveState {
  kind: 'move-moved-succeded'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  players: NodotsPlayers
}

export interface MoveMovedFailed extends MoveState {
  kind: 'move-moved-failed'
  message: NodotsMessage
}

export interface MoveError extends MoveState {
  kind: 'move-error'
  message: NodotsMessage
}

export type NodotsMoveState =
  | MoveInitialized
  | MoveMoving
  | MoveMovedSucceded
  | MoveMovedFailed
  | MoveError

export interface NodotsMovePayload {
  state: NodotsMoveState
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  moves: NodotsMove[]
  move: NodotsMove
  players: NodotsPlayers
}

export interface PossibleMove {
  origin: Checkercontainer // FIXME
  destination: Checkercontainer
}
export type PossibleMoves = PossibleMove[]

export const move = (
  state: NodotsMoveState,
  checkerId: string,
  players: NodotsPlayers
): MoveMoving | MoveMovedSucceded | MoveError | MoveMovedFailed => {
  const { board, moves, player } = state
  console.log('[GameStore] types/move state.kind:', state.kind)
  console.log('[GameStore] types/move checkerId:', checkerId)

  const checker = getChecker(board, checkerId)
  const activeMove = getNextMove(moves) as NodotsMove
  console.log('[GameStore] types/move activeMove:', activeMove)

  const possibleMoves: PossibleMoves = []

  const origins = getOriginsForColor(board, player.color)

  origins.map((origin) => {
    const destination = getDestinationForOrigin(state, origin, activeMove)
    if (destination) {
      const possibleMove: PossibleMove = {
        origin,
        destination,
      }
      possibleMoves.push(possibleMove)
    }
  })

  possibleMoves.map((pm) => {
    if (pm.origin.kind === 'point') {
      const originPoint = pm.origin as Point
      if (pm.destination.kind === 'point') {
        const destinationPoint = pm.destination as Point
        console.log(
          originPoint.position[player.direction],
          destinationPoint.position[player.direction]
        )
      } else if (pm.destination.kind === 'off') {
        const destinationOff = pm.destination as Off
        console.log(
          originPoint.position[player.direction],
          destinationOff.position
        )
      }
    } else if (pm.origin.kind === 'bar' && pm.origin.checkers.length > 0) {
      const originBar = pm.origin
      const destinationPoint = pm.destination as Point
      console.log(originBar.kind, destinationPoint.position[player.direction])
    }
  })

  if (possibleMoves.length === 0) {
    return {
      ...state,
      kind: 'move-moved-failed',
      message: {
        game: 'No move',
      },
    }
  }

  const origin = getCheckercontainers(board).find((checkercontainer) =>
    checkercontainer.checkers.find((checker) => checker.id === checkerId)
  ) as Checkercontainer

  const destination = getDestinationForOrigin(state, origin, activeMove)

  if (!destination) {
    return {
      ...state,
      kind: 'move-error',
      player: player as MovingPlayer,
      message: {
        game: `Could not find destination`,
      },
    }
  }

  checker.checkercontainerId = destination.id

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

  // This took a while to figure out: Hitting is really not part of move flow; it's its own thing.
  // So, take care of it now and move on to the rest of the move.
  // FIXME: Handle this in game history
  if (isMoveHit(payload)) {
    hit(state, destination)
  }

  switch (origin.kind) {
    case 'point':
      switch (destination.kind) {
        case 'point':
          const newMoveState = pointToPoint(payload)
          return newMoveState
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

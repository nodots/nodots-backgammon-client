import { CHECKERS_PER_PLAYER, MoveDirection } from '..'
import {
  NodotsBoardStore,
  getCheckercontainers,
  getPipCounts,
  getPoints,
} from '../Board'
import { Checker, getChecker } from '../Checker'
import { Checkercontainer, Off, Point } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { NodotsMessage } from '../Message'
import { MovingPlayer, NodotsPlayer, Player, WinningPlayer } from '../Player'
import { hit } from './Hit'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'

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

interface Move {
  player: MovingPlayer
  board: NodotsBoardStore
  moves: NodotsMoves
}

export interface Initialized extends Move {
  kind: 'initialized'
}

export interface Moving extends Move {
  kind: 'move'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}
export interface Moved extends Move {
  kind: 'moved'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface Completed extends Move {
  kind: 'completed'
  winner: WinningPlayer
  board: NodotsBoardStore
  player: MovingPlayer
  moves: NodotsMoves
}

export interface NoMove extends Move {
  kind: 'no-move'
  message: NodotsMessage
}
export interface Error extends Move {
  kind: 'error'
  message: NodotsMessage
}

export type NodotsMoveState =
  | Initialized
  | Moved
  | Moving
  | Completed
  | Error
  | NoMove

export const buildMoveMessage = (
  player: NodotsPlayer,
  moves: NodotsMoves
): NodotsMessage | undefined => {
  const lastMove = getLastMove(moves) as NodotsMove
  let msgString = `${player.username} moves `
  if (!lastMove || !lastMove.from) {
    //noop
  } else {
    switch (lastMove.from.kind) {
      case 'point':
        const fromPoint = lastMove.from as Point
        msgString += ` from ${fromPoint.position[player.direction]}`
        // if (lastMoveTo.kind === 'point') {
        //   const toPoint = lastMoveTo as Point
        //   msgString += ` to ${toPoint.position[player.direction]}`
        // }
        break
      case 'bar':
        msgString += ` bar to ${lastMove.dieValue}`
        break
      default:
        msgString += `from ${JSON.stringify(lastMove.from)} to ${JSON.stringify(
          lastMove.to
        )}`
    }
  }

  return {
    game: msgString,
  }
}

export const getDestinationForOrigin = (
  state: NodotsMoveState,
  origin: Checkercontainer,
  activeMove: NodotsMove
): Off | Point | undefined => {
  const { board, player } = state
  switch (origin.kind) {
    case 'point':
      const originPoint = origin as Point
      const delta = activeMove.dieValue * -1
      const dpp = originPoint.position[activeMove.direction] + delta
      console.log('[getDestinationForOrigin] destinationPointPosition:', dpp)
      if (dpp <= 0) {
        return board.off[player.color]
      } else {
        return board.points.find(
          (point) => point.position[player.direction] === dpp
        )
      }
    case 'bar':
      const destinationPointPosition = 25 - activeMove.dieValue
      return state.board.points.find((point) => {
        return point.position[activeMove.direction] === destinationPointPosition
      }) as Point // FIXME
    case 'off':
    default:
    //
  }
}

export const getLastMove = (moves: NodotsMoves) =>
  moves.find((move) => move.to !== undefined)

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const isBearOffing = (
  board: NodotsBoardStore,
  player: Player
): boolean => {
  const homeBoardPoints = board.points.filter(
    (point) => point.position[player.direction] <= 6
  )
  const homeBoardCheckerCount = homeBoardPoints
    .map((point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
        ? point.checkers.length
        : 0
    )
    .reduce((a, b) => a + b, 0)

  const offCheckerCount = board.off[player.color].checkers.length
  const checkerCount = homeBoardCheckerCount + offCheckerCount
  // -1 because the checker that is in play isn't counted?
  return checkerCount === CHECKERS_PER_PLAYER - 1 ? true : false
}

export const isReentering = (
  board: NodotsBoardStore,
  player: Player
): boolean => (board.bar[player.color].checkers.length > 0 ? true : false)

export const isMoving = (moveState: NodotsMoveState): boolean => {
  switch (moveState.kind) {
    case 'initialized':
      return false
    case 'move':
      return true
    default:
      return false
  }
}

export const getOriginPointById = (
  board: NodotsBoardStore,
  id: string
): Point => {
  const point = getPoints(board).find((point) => point.id === id)
  if (!point) {
    throw new Error(`Could not find point for id ${id}`)
  }
  return point
}

export interface NodotsMovePayload {
  state: NodotsMoveState
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  moves: NodotsMove[]
  move: NodotsMove
}

const isMoveSane = (payload: NodotsMovePayload): boolean => {
  const { checker, origin, destination, state } = payload
  const { board, player } = state
  if (board.bar[player.color].checkers.length > 0 && origin.kind !== 'bar') {
    console.error(`${player.username} has checkers on the bar`)
    return false
  }

  if (
    destination &&
    destination.checkers &&
    destination.checkers.length > 1 &&
    destination.checkers[0].color !== checker.color
  ) {
    console.warn(`destination point occupied`)
    return false
  }

  if (checker.color !== player.color) {
    console.error(`Not ${player.username}'s checker`)
    return false
  }

  return true
}

const isMoveHit = (payload: NodotsMovePayload): boolean => {
  const { checker, destination } = payload

  if (
    destination.checkers.length === 1 &&
    destination.checkers[0].color !== checker.color
  )
    return true

  return false
}

export const move = (
  state: NodotsMoveState,
  checkerId: string
): Moving | Moved | Completed | Error | NoMove => {
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
      kind: 'no-move',
      player: player as MovingPlayer,
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
  }

  if (!isMoveSane(payload)) {
    return {
      ...state,
      kind: 'error',
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
      return pointToPoint(payload)
    case 'bar':
      return reenter(payload)
    default:
      throw Error(`Unknown origin.kind ${origin.kind}`)
  }
}

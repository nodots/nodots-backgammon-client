import { MoveDirection } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
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
        if (lastMove.to && lastMove.to.kind === 'point') {
          const toPoint = lastMove.to as Point
          msgString += ` to ${toPoint.position[player.direction]}`
        }
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

const getMostDistantOccupiedPointPosition = (
  board: NodotsBoardStore,
  player: NodotsPlayer
) => {
  if (board.bar[player.color].checkers.length > 0) return 25 // Player is on the bar
  const occupiedPoints = board.points.filter(
    (point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
  )

  const mostDistantPoint =
    player.direction === 'clockwise'
      ? occupiedPoints[occupiedPoints.length - 1]
      : occupiedPoints[0]
  return mostDistantPoint.position[player.direction]
}

// This is the most important function in the application
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
      let destinationPointPosition =
        originPoint.position[player.direction] + delta

      const mostDistantPointPosition = getMostDistantOccupiedPointPosition(
        board,
        player
      )

      if (destinationPointPosition === 0) {
        return board.off[player.color]
      } else if (destinationPointPosition > 0) {
        const d = board.points.find(
          (point) =>
            point.position[player.direction] === destinationPointPosition
        )
        if (!d) {
          return undefined
        }
        return d
      } else if (
        destinationPointPosition < 0 &&
        originPoint.position[player.direction] * -1 < mostDistantPointPosition
      ) {
        return board.off[player.color]
      }
      break
    case 'bar':
      destinationPointPosition = 25 - activeMove.dieValue
      return state.board.points.find((point) => {
        return point.position[activeMove.direction] === destinationPointPosition
      }) as Point // FIXME
    case 'off':
    default:
      break
    //
  }
}

export const getLastMove = (moves: NodotsMoves) =>
  moves.find((move) => move.to !== undefined)

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const isReentering = (
  board: NodotsBoardStore,
  player: Player
): boolean => (board.bar[player.color].checkers.length > 0 ? true : false)

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
      return pointToPoint(payload)
    case 'bar':
      return reenter(payload)
    default:
      throw Error(`Unknown origin.kind ${origin.kind}`)
  }
}

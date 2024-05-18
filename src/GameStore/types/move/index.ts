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

const getMostDistantCheckerPosition = (state: NodotsMoveState) => {
  const { board, player } = state
  if (board.bar[player.color].checkers.length > 0)
    return board.bar[player.color]

  const pointSort = (a: Point, b: Point, direction: MoveDirection): boolean => {
    return direction === 'clockwise'
      ? a.position[direction] > b.position[direction]
      : a.position[direction] < b.position[direction]
  }

  const sortPointsByDirection = (
    points: Point[],
    direction: MoveDirection
  ): Point[] => {
    points.sort((a, b) =>
      a.position[direction] > b.position[direction] ? -1 : 1
    )
    return points
  }

  const sortedPoints = sortPointsByDirection(board.points, player.direction)

  const mostDistantPosition = sortedPoints.find(
    (point) =>
      point.checkers.filter((checker) => checker.color === player.color)
        .length > 0
  )

  return mostDistantPosition as Checkercontainer
}

export const canBearOff = (
  state: NodotsMoveState,
  origin: Point,
  activeMove: NodotsMove
) => {
  const { player } = state
  const mostDistantPosition = getMostDistantCheckerPosition(state)
  switch (mostDistantPosition.kind) {
    case 'bar':
      return false
    case 'point':
    default:
      const mostDistantOccupiedPoint = mostDistantPosition as Point
      const mostDistantOccupiedPointPosition =
        mostDistantOccupiedPoint.position[activeMove.direction]
      const originPointPosition = origin.position[player.direction]

      console.log(
        'mostDistantOccupiedPointPosition',
        mostDistantOccupiedPointPosition
      )
      console.log('originPointPosition', originPointPosition)
      console.log('dieValue', activeMove.dieValue)

      if (origin.checkers.length === 0) {
        console.warn(
          'Cannot bear off because there are no checkers on this point. Should never happen'
        )
        return false
      }

      if (origin.checkers[0].color !== player.color) {
        console.warn(
          'Cannot bear off because this is not the active players checker. Should never happen'
        )
        return false
      }

      if (mostDistantOccupiedPointPosition > 6) {
        console.warn(
          'Cannot bear off because there is not in the home board: ',
          mostDistantOccupiedPointPosition
        )
        return false
      } // checkers out of home board

      return true
  }
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
      const dpp = originPoint.position[activeMove.direction] + delta
      // A player bears off a checker by rolling a number that corresponds to the point on which the checker resides,
      //    and then removing that checker from the board. Thus, rolling a 6 permits the player to remove a checker from the six point.

      if (dpp === 0) {
        return board.off[player.color]
      }
      // else if (dpp > 0) {
      //   const d = board.points.find(
      //     (point) => point.position[player.direction] === dpp
      //   )
      //   if (!d) {
      //     return undefined
      //   }
      //   return d
      // }
      break
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

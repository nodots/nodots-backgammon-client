import { CHECKERS_PER_PLAYER, DestinationPosition, MoveDirection } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Bar, Checkercontainer, Point } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { NodotsMessage } from '../Message'
import { MovingPlayer, NodotsPlayer, Player } from '../Player'
import { bearOff } from './BearOff'
import { hit } from './Hit'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'

// TODO: Implement revert move
// TODO: Implement forced moves

export interface NodotsMove {
  checker: Checker | undefined
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  dieValue: DieValue
  direction: MoveDirection
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
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}
export interface Moved extends Move {
  kind: 'move'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export type NodotsMoveState = Initialized | Moved | Moving

export const buildMoveMessage = (
  player: NodotsPlayer,
  moves: NodotsMoves
): NodotsMessage => {
  const lastMove = getLastMove(moves) as NodotsMove
  console.log(lastMove)
  let msgString = `${player.username} moves `
  const lastMoveFrom = lastMove.from as Checkercontainer
  const lastMoveTo = lastMove.to as Checkercontainer

  switch (lastMoveFrom.kind) {
    case 'point':
      const fromPoint = lastMoveFrom as Point
      msgString += ` from ${fromPoint.position[player.moveDirection]}`
      if (lastMoveTo.kind === 'point') {
        const toPoint = lastMoveTo as Point
        msgString += ` to ${toPoint.position[player.moveDirection]}`
      }
      break
    case 'bar':
      const bar = lastMoveFrom as Bar
      const destination = lastMoveTo as Point
      msgString += ` bar to ${destination.position[player.moveDirection]}`
      break
    default:
      msgString += `from ${JSON.stringify(lastMove.from)} to ${JSON.stringify(
        lastMove.to
      )}`
  }

  return {
    game: msgString,
  }
}

export const getDestinationForOrigin = (
  state: NodotsMoveState,
  origin: Checkercontainer,
  activeMove: NodotsMove
): Checkercontainer => {
  const checker = activeMove.checker as Checker // FIXME
  console.log('[getDestinationForOrigin] checker:', checker)
  switch (origin.kind) {
    case 'point':
      let destinationPoint: Point
      const originPoint = origin as Point
      const delta = activeMove.dieValue * -1

      if (delta > 0 && state.kind === 'move') {
        return state.board.off['black'] // FIXME
        // return state.board.off[activeMove.checker.color]
      } else {
        const destinationPointPosition =
          originPoint.position[activeMove.direction] + delta
        destinationPoint = state.board.points.find(
          (point) =>
            point.position[activeMove.direction] === destinationPointPosition
        ) as Point // FIXME

        return destinationPoint
      }
      throw Error('Could not find destination')
    case 'bar':
      const destinationPointPosition = 25 - activeMove.dieValue
      const destination = state.board.points.find((point) => {
        return point.position[activeMove.direction] === destinationPointPosition
      }) as Point // FIXME
      return destination
    default:
      break
  }
  return origin //FIXME
}

export const getLastMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from !== undefined)

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const isBearOffing = (
  board: NodotsBoardStore,
  player: Player
): boolean => {
  const homeBoardPoints = board.points.filter(
    (point) => point.position[player.moveDirection] <= 6
  )
  const homeBoardCheckerCount = homeBoardPoints
    .map((point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
        ? point.checkers.length
        : 0
    )
    .reduce((a, b) => a + b, 0)

  return homeBoardCheckerCount === CHECKERS_PER_PLAYER ? true : false
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

export const move = (
  state: NodotsMoveState,
  checkerId: string
): NodotsMoveState => {
  const { board, moves, player } = state

  switch (state.kind) {
    case 'initialized':
      const checkerToMove = getChecker(board, checkerId)
      if (checkerToMove.color !== player.color) {
        console.error(`Not ${player.username}'s checker`)
        return state
      }
      if (board.bar[player.color].checkers.length > 0) {
        console.error(`${player.username} has checkers on the bar`)
        return state
      }
      const activeMove = getNextMove(moves) as NodotsMove
      const originCheckercontainer = getCheckercontainers(board).find(
        (checkercontainer) =>
          checkercontainer.checkers.find((checker) => checker.id === checkerId)
      ) as Checkercontainer

      const destination = getDestinationForOrigin(
        state,
        originCheckercontainer,
        activeMove
      ) as Point // Fixme

      if (!destination) {
        throw Error(`No destination for ${JSON.stringify(origin)}`)
      }

      if (
        destination.checkers.length > 1 &&
        destination.checkers[0].color !== checkerToMove.color
      ) {
        return {
          ...state,
        }
      }

      if (
        destination.checkers.length === 1 &&
        destination.checkers[0].color !== checkerToMove.color
      ) {
        hit(state, destination)
      }

      switch (originCheckercontainer.kind) {
        case 'point':
          if (isBearOffing(board, player)) {
            return bearOff(state, activeMove, originCheckercontainer as Point)
          } else {
            return pointToPoint(
              state,
              checkerToMove,
              activeMove,
              originCheckercontainer as Point,
              destination as Point
            )
          }
        case 'bar':
          return reenter(
            state,
            checkerToMove,
            activeMove,
            originCheckercontainer as Bar,
            destination as Point
          )
        default:
          console.error(`Cannot move from ${originCheckercontainer.kind}`)
      }
  }

  return state
}

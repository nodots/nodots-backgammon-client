import { CHECKERS_PER_PLAYER, MoveDirection } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Bar, Checkercontainer, Point } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { Player } from '../Player'
import { bearOff } from './BearOff'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'

// TODO: Flubbed moves don't change state
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
  player: Player
  board: NodotsBoardStore
  moves: NodotsMoves
}

export interface Initialized extends Move {
  kind: 'initialized'
}

export interface Moved extends Move {
  kind: 'move'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export type NodotsMoveState = Initialized | Moved

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
      const originPointPosition = originPoint.position[activeMove.direction]
      const delta = activeMove.dieValue * -1
      console.log(
        '[getDestinationForOrigin] originPointPosition:',
        originPointPosition
      )
      console.log('[getDestinationForOrigin] delta:', delta)
      if (delta > 0) {
        console.warn('bearOff not supported')
        // bearOff(state, activeMove, origin)
      } else {
        const destinationPointPosition =
          originPoint.position[activeMove.direction] + delta

        console.log(
          '[getDestinationForOrigin] destinationPointPosition:',
          destinationPointPosition
        )

        destinationPoint = state.board.points.find(
          (point) =>
            point.position[activeMove.direction] === destinationPointPosition
        ) as Point // FIXME

        console.log(
          '[getDestinationForOrigin] destinationPoint:',
          destinationPoint
        )
        return destinationPoint
      }
      throw Error('Could not find destination')
    case 'bar':
      state.board.bar[checker.color]
      break
    default:
      break
  }
  return origin //FIXME
}

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const isBearOff = (board: NodotsBoardStore, player: Player): boolean => {
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

export const isReenter = (board: NodotsBoardStore, player: Player): boolean =>
  board.bar[player.color].checkers.length > 0 ? true : false

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
      const activeMove = getNextMove(moves) as NodotsMove
      const originCheckercontainer = getCheckercontainers(board).find(
        (checkercontainer) =>
          checkercontainer.checkers.find((checker) => checker.id === checkerId)
      ) as Checkercontainer

      // TODO: Is being on the bar a state of a player? I think so. Ready | Bar | BearingOff | Resigned | Won | Lost
      if (
        board.bar[player.color].checkers.length > 0 &&
        originCheckercontainer.kind !== 'bar'
      ) {
        return state
      }

      const destination = getDestinationForOrigin(
        state,
        originCheckercontainer,
        activeMove
      )

      if (originCheckercontainer.kind === 'point') {
        if (isBearOff(board, player)) {
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
      }
      if (originCheckercontainer.kind === 'bar') {
        return reenter(
          state,
          checkerToMove,
          activeMove,
          originCheckercontainer as Bar,
          destination as Point
        )
      }
      break
    case 'move':
      break
  }
  return state
}

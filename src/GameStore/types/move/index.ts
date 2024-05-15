import { CHECKERS_PER_PLAYER, MoveDirection } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Bar, Checkercontainer, Off, Point } from '../Checkercontainer'
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
  kind: 'moved'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface Completed {
  kind: 'completed'
  winner: WinningPlayer
  board: NodotsBoardStore
  player: Player
  moves: NodotsMoves
}

export type NodotsMoveState = Initialized | Moved | Moving | Completed

export const buildMoveMessage = (
  player: NodotsPlayer,
  moves: NodotsMoves
): NodotsMessage | undefined => {
  const lastMove = getLastMove(moves) as NodotsMove
  let msgString = `${player.username} moves `
  if (!lastMove || !lastMove.from) {
    return {
      game: 'No last move',
    }
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
    default:
      throw Error('Unknown situation')
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

export const move = (
  state: NodotsMoveState,
  checkerId: string
): NodotsMoveState => {
  const { board, player, moves } = state

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

  if (
    board.bar[player.color].checkers.length > 0 &&
    originCheckercontainer.kind !== 'bar'
  ) {
    console.error(`${player.username} has checkers on the bar`)
    return state
  }

  const destination = getDestinationForOrigin(
    state,
    originCheckercontainer,
    activeMove
  ) as Point | Off

  if (!destination) {
    throw Error(`No destination for ${JSON.stringify(origin)}`)
  }

  if (
    destination &&
    destination.checkers &&
    destination.checkers.length > 1 &&
    destination.checkers[0].color !== checkerToMove.color
  ) {
    console.warn(`destination point occupied`)
    return {
      ...state,
    }
  }

  if (
    destination &&
    destination.checkers &&
    destination.checkers.length === 1 &&
    destination.checkers[0].color !== checkerToMove.color &&
    destination.kind !== 'off'
  ) {
    console.log('HIT!')
    hit(state, destination)
  }

  switch (originCheckercontainer.kind) {
    case 'point':
      return pointToPoint(
        state,
        checkerToMove,
        activeMove,
        originCheckercontainer as Point,
        destination
      )
    case 'bar':
      switch (state.kind) {
        case 'initialized':
        case 'moved':
        case 'completed':
          break
        case 'move':
          return reenter(
            state,
            checkerToMove,
            activeMove,
            originCheckercontainer as Bar,
            destination as Point
          )
      }
  }
  return state
}

import { CHECKERS_PER_PLAYER, DestinationPosition, OriginPosition } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
import { Checker, getChecker } from '../Checker'
import { Bar, Checkercontainer, Point } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { Player } from '../Player'
import { bearOff } from './BearOff'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'

export interface NodotsMove {
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  dieValue: DieValue
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
export interface CheckerClicked extends Move {
  kind: 'checker-clicked'
  activeMove: NodotsMove
  checkerToMove: Checker
}

export interface OriginDetermined extends Move {
  kind: 'origin-determined'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: OriginPosition
}

export interface DestinationDetermined extends Move {
  kind: 'origin-determined'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: OriginPosition
  destination: DestinationPosition
}

export interface Moved extends Move {
  kind: 'move'
  activeMove: NodotsMove
  checkerToMove: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export type NodotsMoveState =
  | Initialized
  | CheckerClicked
  | OriginDetermined
  | DestinationDetermined
  | Moved

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

      if (
        board.bar[player.color].checkers.length > 0 &&
        originCheckercontainer.kind !== 'bar'
      ) {
        return state
      }

      if (originCheckercontainer.kind === 'point') {
        if (isBearOff(board, player)) {
          return bearOff(
            state,
            checkerToMove,
            activeMove,
            originCheckercontainer as Point
          )
        } else {
          return pointToPoint(
            state,
            checkerToMove,
            activeMove,
            originCheckercontainer as Point
          )
        }
      }
      if (originCheckercontainer.kind === 'bar') {
        return reenter(
          state,
          checkerToMove,
          activeMove,
          originCheckercontainer as Bar
        )
      }
      break
    case 'checker-clicked':
    case 'origin-determined':
    case 'move':
      break
  }
  return state
}

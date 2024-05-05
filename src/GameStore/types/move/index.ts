import { CHECKERS_PER_PLAYER, OriginPosition } from '..'
import { NodotsBoardStore, getCheckercontainers, getPoints } from '../Board'
import { Checkercontainer, Point } from '../Checkercontainer'
import { DieValue } from '../Dice'
import { Player } from '../Player'
import { bearOff } from './BearOff'
import { pointToPoint } from './PointToPoint'

export interface NodotsMove {
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  dieValue: DieValue
}

export type NodotsMoves =
  | [NodotsMove, NodotsMove]
  | [NodotsMove, NodotsMove, NodotsMove, NodotsMove]

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

export const getDestinationForOrigin = (
  store: NodotsBoardStore,
  origin: Checkercontainer,
  dieValue: DieValue,
  player: Player
): Checkercontainer => {
  switch (origin.kind) {
    case 'point':
      {
        const originPoint = origin as Point
        let destination: Point = originPoint
        const destinationPosition =
          player.moveDirection === 'clockwise'
            ? originPoint.position.clockwise - dieValue
            : originPoint.position.clockwise + dieValue
        console.log(destinationPosition)
      }

      break
    default:
      console.log(origin.kind)
  }
  let destination = store.off.black
  return destination
}

export const move = (
  board: NodotsBoardStore,
  checkerId: string,
  player: Player,
  activeMove: NodotsMove
): NodotsBoardStore => {
  const checkercontainers = getCheckercontainers(board)
  const originContainer = checkercontainers.find((checkercontainer) =>
    checkercontainer.checkers.find((checker) => checker.id === checkerId)
  ) as Checkercontainer

  if (originContainer.checkers.length === 0) {
    console.error('Origin has no checkers')
    return board
  }

  if (
    originContainer.checkers.length > 1 &&
    originContainer.checkers[0].color !== player.color
  ) {
    console.error(`Not ${player.username}'s checker to move`)
    return board
  }

  const checkerToMove = originContainer.checkers.find(
    (checker) => checker.id === checkerId
  )
  if (!checkerToMove) {
    throw Error('No checker to move')
  }
  const originKind = originContainer.kind

  if (isBearOff(board, player))
    return bearOff(board, originContainer.id, checkerId, activeMove)

  switch (originKind) {
    case 'point':
      // console.log('point2point or bearOff or noMove')
      if (board.bar[player.color].checkers.length > 0) {
        console.error(
          `${player.username} has checkers on the bar and must move those first`
        )
        return board
      }
      const origin = originContainer as Point

      // const originPosition = origin.position[player.moveDirection]
      return pointToPoint(board, player, origin, checkerToMove, activeMove)

      break
    case 'bar':
      console.log('reenter')
      break
    case 'off':
      console.error('cannot move from off')
      break
    default:
    // noop
  }

  return board
}

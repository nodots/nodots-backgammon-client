import { produce } from 'immer'
import { CHECKERS_PER_PLAYER, GameError, MoveDirection } from '../game'
import { Board } from '../../components/board/state'
import { Checker, isChecker } from '../../components/checker/state'
import { Player, isPlayer } from '../../components/player/state'
import { Move, MoveStatus, pointToPoint } from '.'
import { getCheckerboxCoordinates } from '../../components/board/state/types/board'
import { MoveResult } from './reducer'
import { Off } from '../../components/off/state/types'
import { Point, isPoint } from '../../components/Point/state/types'
import { Quadrant, isQuadrant } from '../../components/quadrant/state'
import { DieValue } from '../../components/die/state'
import { getBearOffQuadrantLocation } from '../../components/player/state'

export const bearOff = (board: Board, move: Move): MoveResult => {
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isPoint(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin',
    })
  }

  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const oldOrigin =
    board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, (draft) => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  const destinationPosition =
    move.direction === 'clockwise'
      ? newOrigin.position + move.dieValue
      : newOrigin.position - move.dieValue

  if (destinationPosition > 24 || destinationPosition < 1) {
    const oldDestination = board.off[checkerToMove.color]
    const newDestination = produce(oldDestination, (draft) => {
      if (isChecker(checkerToMove)) {
        draft.checkers.push(checkerToMove)
      }
    })
    const newBoard = produce(board, (draft) => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] =
        newOrigin
      if (isChecker(checkerToMove)) {
        draft.off[checkerToMove.color] = newDestination
      }
    })

    const newMove = produce(move, (draft) => {
      draft.destination = newDestination
      draft.status = MoveStatus.COMPLETED
    })
    moveResult = { board: newBoard, move: newMove }
  } else {
    moveResult = pointToPoint(board, move)
  }

  return moveResult
}

export function canBearOff(
  board: Board,
  dieValue: DieValue,
  player: Player
): boolean {
  let bearOffQuadrant: Quadrant | undefined = undefined
  let bearOffCheckerbox: Off | undefined = undefined
  let bearOffPoint: Point | undefined = undefined
  let bearOffPointsWithCheckers: Point[] = []
  let totalBearOffCheckers = 0

  if (isPlayer(player)) {
    const bearOffQuadrantLocation = getBearOffQuadrantLocation(
      player.moveDirection
    )
    bearOffQuadrant = board.quadrants.find(
      (q) => q.location === bearOffQuadrantLocation
    )
    bearOffCheckerbox = board.off[player.color]
    totalBearOffCheckers = bearOffCheckerbox.checkers.length
    if (isQuadrant(bearOffQuadrant)) {
      bearOffQuadrant.points.forEach((p) => {
        const checkerCount = p.checkers.filter(
          (c) => c.color === player.color
        ).length
        totalBearOffCheckers += checkerCount
      })
      bearOffPoint = bearOffQuadrant.points.find(
        (p) =>
          bearOffPointPositionToDieValue(p.position, player.moveDirection) <=
          dieValue
      )
    }
    if (totalBearOffCheckers < CHECKERS_PER_PLAYER) {
      return false
    }
  }
  return isPoint(bearOffPoint)
}

export function bearOffPointPositionToDieValue(
  position: number,
  direction: MoveDirection
) {
  return direction === 'counterclockwise' ? position : 25 - position
}

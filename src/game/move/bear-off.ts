import { produce } from 'immer'
import { isColor } from '..'
import { Color, GameError } from '../game'
import { Board, getCheckerBoxes } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { Player, isPlayer } from '../../components/Player/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, MoveStatus, getCheckerboxCoordinates, pointToPoint } from '.'
import { MoveResult } from './reducer'
import { Point, isPoint } from '../../components/Point/state/types'
import { Off, isOff } from '../../components/Off/state/types'
import { QuadrantLocation, Quadrant, isQuadrant } from '../../components/Quadrant/state'
import { DieValue } from '../../components/Die/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'

export const bearOff = (board: Board, move: Move): MoveResult => {
  console.log('[BEAR_OFF] bear-off')
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isPoint(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin'
    })
  }

  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  const destinationPosition =
    move.direction === 'clockwise'
      ? newOrigin.position + move.dieValue
      : newOrigin.position - move.dieValue

  console.warn('[BEAR_OFF] destinationPosition:', destinationPosition)
  if (destinationPosition > 24 || destinationPosition < 0) {
    console.warn('[BEAR_OFF] bearing off')
    const oldDestination = board.off[checkerToMove.color]
    const newDestination = produce(oldDestination, draft => {
      if (isChecker(checkerToMove)) {
        draft.checkers.push(checkerToMove)
      }
    })
    const newBoard = produce(board, draft => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      if (isChecker(checkerToMove)) {
        draft.off[checkerToMove.color] = newDestination
      }
    })

    const newMove = produce(move, draft => {
      draft.destination = newDestination
      draft.status = MoveStatus.COMPLETED
    })
    moveResult = { board: newBoard, move: newMove }

  } else {
    moveResult = pointToPoint(board, move)
  }

  return moveResult
}

export function canBearOff (board: Board, dieValue: DieValue, player: Player): boolean {
  let bearOff = false
  let bearOffQuadrant: Quadrant | undefined = undefined
  let bearOffPoint: Point | undefined = undefined

  console.warn('[BEAR_OFF][canBearOff]')

  if (isPlayer(player)) {
    const bearOffQuadrantLocation = getBearOffQuadrantLocation(player.moveDirection)
    bearOffQuadrant = board.quadrants.find(q => q.location === bearOffQuadrantLocation)
    console.warn('[BEAR_OFF][canBearOff] bearOffQuadrant:', bearOffQuadrant)
  }
  const bearOffPointPosition =
    player.moveDirection === 'clockwise'
      ? 24 - dieValue + 1
      : dieValue

  if (isQuadrant(bearOffQuadrant)) {
    bearOffPoint = bearOffQuadrant.points.find(p => p.position === bearOffPointPosition && p.checkers.length > 0 && p.checkers[0].color === player.color)
  }

  return isPoint(bearOffPoint)

}
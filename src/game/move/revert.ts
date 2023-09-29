import { produce } from 'immer'
import { GameError } from '../game'
import { getCheckerBoxes } from '../../components/board/state'
import { Board } from '../../components/board/state'
import { Checker, isChecker } from '../../components/checker/state'
import { Move, MoveStatus, getCheckerboxCoordinates, hit } from '.'
import { isBar, Bar } from '../../components/bar/state/types'
import { Point, isPoint } from '../../components/point/state/types'
import { MoveResult } from './reducer'
import { sanityCheckBoard } from '../../components/board/state/types'

export const revert = (board: Board, move: Move): MoveResult => {
  let moveResult = { board, move }

  let isHit = false
  let checkerToMove: Checker
  let hitChecker: Checker
  let origin: Point
  let newOrigin: Point
  let destination: Point
  let newDestination: Point
  let opponentRail: Bar
  let newOpponentRail: Bar
  let finalMove: Move
  let finalBoard: Board

  if (move.destination && isPoint(move.destination) && move.origin && isPoint(move.origin) && isChecker(move.checker)) {
    origin = move.destination
    destination = move.origin
    checkerToMove = move.checker

    const newOriginCheckers = origin.checkers.filter(c => c.id !== checkerToMove.id)
    newOrigin = produce(origin, draft => {
      draft.checkers = newOriginCheckers
    })
    newDestination = produce(destination, draft => {
      draft.checkers.push(checkerToMove)
    })

    finalMove = produce(move, draft => {
      draft.origin = undefined
      draft.destination = undefined
      draft.checker = undefined
      draft.status = MoveStatus.INITIALIZED
    })

    const originInfo = getCheckerboxCoordinates(board, origin.id)
    const destinationInfo = getCheckerboxCoordinates(board, destination.id)

    finalBoard = produce(board, draft => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
    })

    // sanityCheckBoard(finalBoard)

    moveResult.move = finalMove
    moveResult.board = finalBoard

    return moveResult

  }

  return moveResult
}


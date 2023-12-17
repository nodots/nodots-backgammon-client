import { produce } from 'immer'
import { Point } from '../../components/Point/state/types'
import { Checker, isChecker } from '../../components/checker/state'
import { Board } from '../../components/board/state'
import { Bar, isBar } from '../../components/Bar/state/types'
import { Move, MoveStatus, MoveMode } from '.'
import { getCheckerboxCoordinates } from '../../components/board/state/types/board'
import { MoveResult } from './reducer'
import { QuadrantLocation, isQuadrant } from '../../components/quadrant/state'
import {
  canAcceptChecker,
  isCheckerBox,
} from '../../components/Checkerbox/state/types'

export const reenter = (board: Board, move: Move): MoveResult => {
  let isHit = false
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isBar(move.origin)) {
    console.error('[User Message]: you must move checkers on the bar first')
  } else {
    const oldOrigin = board.bar[move.origin.color]
    const newOrigin = produce(oldOrigin, (draft) => {
      draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
    })
    checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]

    const targetQuadrant =
      move.direction === 'clockwise'
        ? board.quadrants.find((q) => q.location === QuadrantLocation.SE)
        : board.quadrants.find((q) => q.location === QuadrantLocation.NE)

    if (isQuadrant(targetQuadrant)) {
      const targetPointPosition =
        move.direction === 'clockwise' ? move.dieValue : 24 - move.dieValue + 1
      const destinationPoint = targetQuadrant.points.find(
        (p) => p.position === targetPointPosition
      )

      if (
        isCheckerBox(destinationPoint) &&
        canAcceptChecker(destinationPoint, checkerToMove)
      ) {
        let opponentCheckers = destinationPoint.checkers.filter(
          (c) => c.color !== checkerToMove?.color
        )
        let hitChecker: Checker | undefined = undefined
        if (opponentCheckers.length === 1) {
          isHit = true
          hitChecker = opponentCheckers[0]
        }

        let oldOpponentRail: Bar | undefined = undefined
        let newOpponentRail: Bar | undefined = undefined

        let newDestination = produce(destinationPoint, (draft) => {
          if (isChecker(checkerToMove)) {
            if (isHit && isChecker(hitChecker)) {
              draft.checkers = [checkerToMove]
              oldOpponentRail = board.bar[hitChecker.color]
              newOpponentRail = produce(
                oldOpponentRail,
                (opponentRailDraft) => {
                  if (isChecker(hitChecker)) {
                    opponentRailDraft.checkers.push(hitChecker)
                  }
                }
              )
            } else {
              draft.checkers.push(checkerToMove)
            }
          }
        })

        const destinationInfo = getCheckerboxCoordinates(
          board,
          destinationPoint.id
        )

        let newBoard = produce(board, (draft) => {
          draft.quadrants[destinationInfo.quadrantIndex].points[
            destinationInfo.pointIndex
          ] = newDestination as Point
          if (isChecker(checkerToMove) && isBar(newOrigin)) {
            draft.bar[checkerToMove.color] = newOrigin
          }
          if (isBar(newOpponentRail) && isChecker(hitChecker)) {
            draft.bar[hitChecker.color] = newOpponentRail
          }
        })

        let newMove = produce(move, (draft) => {
          draft.destination = newDestination
          draft.status = MoveStatus.COMPLETED
        })
        moveResult.board = newBoard
        moveResult.move = newMove
      } else {
        const newMove = produce(move, (draft) => {
          draft.status = MoveStatus.NO_MOVE
          draft.mode = MoveMode.NO_MOVE
        })
        moveResult = { board, move: newMove }
      }
      return moveResult
    }
  }
  return moveResult
}

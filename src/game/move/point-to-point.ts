import { produce } from 'immer'
import { GameError } from '../game'
import { getCheckerBoxes } from '../../components/Board/state'
import { Board } from '../../components/Board/state'
import { Checker, isChecker } from '../../components/Checker/state'
import { canAcceptChecker, isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, MoveStatus, getCheckerboxCoordinates, hit } from '.'
import { isRail, Rail } from '../../components/Rail/state/types'
import { Point } from '../../components/Point/state/types'
import { MoveResult } from './reducer'

export const pointToPoint = (board: Board, move: Move): MoveResult => {
  let isHit = false
  let checkerToMove: Checker | undefined = undefined
  let moveResult = { board, move }

  if (!isCheckerBox(move.origin)) {
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
  const destinationPoint = getCheckerBoxes(board).find(cb => typeof cb.position === 'number' && cb.position === destinationPosition)

  if (isCheckerBox(destinationPoint) && canAcceptChecker(destinationPoint, checkerToMove)) {
    let opponentCheckers = destinationPoint.checkers.filter(c => c.color !== checkerToMove?.color)
    let hitChecker: Checker | undefined = undefined
    if (opponentCheckers.length === 1) {
      isHit = true
      hitChecker = opponentCheckers[0]
    }

    let oldRail: Rail | undefined = undefined
    let newRail: Rail | undefined = undefined

    let newDestination = produce(destinationPoint, draft => {
      if (isChecker(checkerToMove)) {
        if (isHit && isChecker(hitChecker)) {
          draft.checkers = [checkerToMove]
          oldRail = board.rail[hitChecker.color]
          newRail = produce(oldRail, railDraft => {
            if (isChecker(hitChecker)) {
              railDraft.checkers.push(hitChecker)
            }
          })
        } else {
          draft.checkers.push(checkerToMove)
        }
      }
    })
    const destinationInfo = getCheckerboxCoordinates(board, destinationPoint.id)

    let newBoard = produce(board, draft => {
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination as Point
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      if (isRail(newRail) && isChecker(hitChecker)) {
        draft.rail[hitChecker.color] = newRail
      }
    })

    let newMove = produce(move, draft => {
      draft.destination = newDestination
      draft.status = MoveStatus.COMPLETED
      if (draft.hit && isHit && isChecker(hitChecker)) {
        draft.hit.checker = hitChecker
      }
    })

    moveResult.board = newBoard
    moveResult.move = newMove

    return moveResult
  }
  return moveResult
}

import { produce } from 'immer'
import { GameError } from '../game'
import { Checker, isChecker } from '../../components/Checker/state'
import { Board } from '../../components/Board/state'
import { Rail, isRail } from '../../components/Rail/state/types'
import { Move, MoveStatus, MoveMode, getCheckerboxCoordinates } from '.'
import { isPoint } from '../../components/Point/state/types'
import { MoveResult } from './reducer'
import { QuadrantLocation, isQuadrant } from '../../components/Quadrant/state'
import { canAcceptChecker, isCheckerBox } from '../../components/CheckerBox/state/types'


export const reenter = (board: Board, move: Move): MoveResult => {
  let isHit = false
  let moveResult = { board, move }
  let checkerToMove: Checker | undefined = undefined

  if (!isRail(move.origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing rail'
    })
  }

  const oldOrigin = board.rail[move.origin.color]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]

  const targetQuadrant =
    move.direction === 'clockwise'
      ? board.quadrants.find(q => q.location === QuadrantLocation.SE)
      : board.quadrants.find(q => q.location === QuadrantLocation.NE)

  if (isQuadrant(targetQuadrant)) {
    const targetPointPosition = move.direction === 'clockwise'
      ? move.dieValue
      : 24 - move.dieValue + 1
    const destinationPoint = targetQuadrant.points.find(p => p.position === targetPointPosition)

    if (isCheckerBox(destinationPoint) && canAcceptChecker(destinationPoint, checkerToMove)) {
      let opponentCheckers = destinationPoint.checkers.filter(c => c.color !== checkerToMove?.color)
      let hitChecker: Checker | undefined = undefined
      if (opponentCheckers.length === 1) {
        isHit = true
        hitChecker = opponentCheckers[0]
      }

      let oldOpponentRail: Rail | undefined = undefined
      let newOpponentRail: Rail | undefined = undefined

      let newDestination = produce(destinationPoint, draft => {
        if (isChecker(checkerToMove)) {
          if (isHit && isChecker(hitChecker)) {
            draft.checkers = [checkerToMove]
            oldOpponentRail = board.rail[hitChecker.color]
            newOpponentRail = produce(oldOpponentRail, opponentRailDraft => {
              if (isChecker(hitChecker)) {
                opponentRailDraft.checkers.push(hitChecker)
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
        if (isChecker(checkerToMove) && isRail(newOrigin)) {
          draft.rail[checkerToMove.color] = newOrigin
        }
        if (isRail(newOpponentRail) && isChecker(hitChecker)) {
          draft.rail[hitChecker.color] = newOpponentRail
        }
      })


      let newMove = produce(move, draft => {
        draft.destination = newDestination
        draft.status = MoveStatus.COMPLETED
      })
      moveResult.board = newBoard
      moveResult.move = newMove
    } else {
      const newMove = produce(move, draft => {
        draft.status = MoveStatus.NO_MOVE
        draft.mode = MoveMode.NO_MOVE
      })
      moveResult = { board, move: newMove }
    }



    return moveResult
  }
  return moveResult
}
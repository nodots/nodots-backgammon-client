import { produce } from 'immer'
import { GameError } from '../game'
import { Board } from '../../components/Board/state'
import { Checker } from '../../components/Checker/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates } from '.'



export const pointToPoint = (board: Board, move: Move): Board => {
  console.log('pointToPoint')
  console.log(move)
  if (!move.origin || !move.destination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }

  return produce(board, draft => {
    let checkerToMove: Checker | undefined = undefined
    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
    console.log('[TRACE] point-to-point  destinationInfo:', destinationInfo)
    console.log('[TRACE] point-to-point  move.origin:', move.origin)
    console.log('[TRACE] point-to-point move.destination:', move.destination)
    const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
    console.log('[TRACE] point-to-point oldDestination:', oldDestination)
    const originInfo = getCheckerboxCoordinates(board, move.origin.id)
    const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
    console.log('[TRACE] point-to-point oldOrigin:', oldOrigin)
    const newOrigin = produce(oldOrigin, draft => {
      draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
    })
    const newDestination = produce(oldDestination, draft => {
      if (!oldOrigin.checkers[oldOrigin.checkers.length - 1]) {
        throw Error('No checkerToMove')
      }
      checkerToMove = oldOrigin.checkers[oldOrigin.checkers.length - 1]
      draft.checkers.push(checkerToMove)
    })

    return produce(board, draft => {
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex] = newDestination
    })
  })
}

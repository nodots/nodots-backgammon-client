import { produce } from 'immer'
import { GameError } from '../game'
import { Board } from '../../components/Board/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates } from '.'



export const hit = (board: Board, move: Move): Board => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }
  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)

  // FIXME: Write propper typeguard
  if (typeof originInfo.quadrantIndex !== 'number' || typeof originInfo.pointIndex !== 'number') {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Quadrant or point index invalid'
    })
  }

  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const checkerToMove = oldOrigin.checkers[oldOrigin.checkers.length - 1]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
  const hitChecker = oldDestination.checkers[0]
  const newDestination = produce(oldDestination, draft => {
    draft.checkers = [checkerToMove]
  })

  const oldRail = board.rail[hitChecker.color]
  const newRail = produce(oldRail, draft => {
    draft.checkers.push(hitChecker)
  })

  return produce(board, draft => {
    draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
    draft.rail[hitChecker.color] = newRail
  })
}

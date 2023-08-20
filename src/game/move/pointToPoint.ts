import { produce } from 'immer'
import { GameError } from '../game'
import { Board } from '../../components/Board/state'
import { Checker } from '../../components/Checker/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates } from '.'



export const pointToPoint = (board: Board, move: Move): Board => {
  if (!move.origin || !move.destination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }

  if (Math.abs((move.origin.position as number) - (move.destination.position as number)) !== (move.dieValue as number)) {
    // throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
    console.error('Move does not match die')
  }
  return produce(board, draft => {
    let checkerToMove: Checker | undefined = undefined
    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const originInfo = getCheckerboxCoordinates(board, move.origin.id)
    const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
    if (originInfo.quadrantIndex !== -1 && originInfo.pointIndex !== -1) {
      const draftCheckers = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers
      checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[draftCheckers.length - 1]
      if (!checkerToMove) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checker to move'
        })
      } else {
        // FIXME typeguard
        let ctm: Checker = checkerToMove as Checker
        // Player has checkers on the rail and must move them first
        if (board.rail[ctm.color].checkers.length > 0) {
          console.log('Checkers on the rail')
          return board
        }
        const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
        const newOrigin = produce(oldOrigin, draft => {
          draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
        })
        const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number]
        const newDestination = produce(oldDestination, draft => {
          draft.checkers.push(ctm)
        })
        return produce(board, draft => {
          draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
          draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
        })
      }
    } else {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin'
      })
    }
  })
}

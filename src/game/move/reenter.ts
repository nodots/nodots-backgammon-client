import { produce } from 'immer'
import { isColor } from '..'
import { GameError } from '../game'
import { Board } from '../../components/Board/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { isRail } from '../../components/Rail/state/types'
import { Move, getCheckerboxCoordinates } from '.'
import { isChecker } from '../../components/Checker/state'

export const reenter = (board: Board, move: Move): Board => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }
  const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
  const checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  if (!isColor(checkerToMove.color)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid color'
    })
  }
  const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]

  // Blocked point
  if (oldDestination.checkers.length > 1 && oldDestination.checkers[0].color !== checkerToMove.color) {
    console.error('Point owned by opponent')
    return board
    // Reenter and hit
  } else if (oldDestination.checkers.length === 1 && oldDestination.checkers[0].color !== checkerToMove.color) {
    console.log('Hitting opponents checker during reenter. move:', move)
    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const oldOrigin = board.rail[checkerToMove.color]
    const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)

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
      draft.rail[checkerToMove.color] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
      draft.rail[hitChecker.color] = newRail
    })
  } else {
    console.log('Plain reenter')
    return produce(board, draft => {
      if (!isRail(move.origin)) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Origin is not a rail'
        })
      }
      if (!move.origin) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Missing origin'
        })
      }
      if (!move.destination) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Missing destination'
        })
      }

      const destinationInfo = getCheckerboxCoordinates(board, move.destination.id)
      if (!checkerToMove) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checker to move'
        })
      } else {
        // FIXME typeguard
        const checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
        if (!isChecker(checkerToMove)) {
          throw new GameError({
            model: 'Move',
            errorMessage: 'Invalid checkerToMove'
          })
        }
        // Player has checkers on the rail and must move them first
        // const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
        const oldOrigin = board.rail[checkerToMove.color]
        console.log(oldOrigin)
        const newOrigin = produce(oldOrigin, draft => {
          draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
        })
        console.log(newOrigin)
        const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number]
        const newDestination = produce(oldDestination, draft => {
          draft.checkers.push(checkerToMove)
        })
        return produce(board, draft => {
          draft.rail[checkerToMove.color] = newOrigin
          draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
        })
      }
    })
  }
}

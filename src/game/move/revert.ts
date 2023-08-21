import { produce } from 'immer'
import { GameError, isColor } from '../game'
import { Board } from '../../components/Board/state'
import { Rail } from '../../components/Rail/state/types'
import { CheckerBox } from '../../components/CheckerBox/state'
import { Move, MoveStatus, getCheckerboxCoordinates } from './index'
import { isChecker } from '../../components/Checker/state'

export const revert = (board: Board, move: Move): { board: Board, move: Move } => {
  console.log('[Revert] move', move)

  if (!move.origin) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No Move origin'
    })
  }

  if (!move.destination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No Move destination'
    })
  }

  if (!move.checker) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No Checker'
    })
  }

  const revertedOrigin = move.destination
  const revertedDestination = move.origin

  const originInfo = getCheckerboxCoordinates(board, revertedOrigin.id)
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })
  let destinationInfo: { quadrantIndex: number, pointIndex: number } | undefined = undefined
  let oldDestination: CheckerBox | undefined = undefined
  if (typeof revertedDestination.position === 'number') {
    destinationInfo = getCheckerboxCoordinates(board, revertedDestination.id)
    oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
  } else if (revertedDestination.position === 'rail') {
    oldDestination = board.rail[move.checker.color]
  }

  if (!oldDestination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No oldDestination'
    })
  }

  const newDestination = produce(oldDestination, draft => {
    const checkerToMove = oldOrigin.checkers[oldOrigin.checkers.length - 1]
    draft.checkers.push(checkerToMove)
  })
  let newRail: Rail | undefined = undefined
  let newHitCheckerbox: CheckerBox | undefined = undefined
  if (move.hit?.checker && move.hit?.checker) {
    const hitChecker = move.hit.checker
    const hitCheckerbox = move.hit.checkerbox
    const oldRail = board.rail[hitChecker.color]
    newRail = produce(oldRail, draft => {
      draft.checkers.splice(oldRail.checkers.length - 1, 1)
    })
    newHitCheckerbox = produce(hitCheckerbox, draft => {
      draft.checkers = [hitChecker]
    })
  }

  const finalBoard = produce(board, draft => {
    draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    if (destinationInfo) {
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
    } else if (newRail && isColor(newRail.color)) {
      draft.rail[newRail.color] = newRail
    }
    if (newRail && newHitCheckerbox) {
      const hitCheckerboxInfo = getCheckerboxCoordinates(board, newHitCheckerbox.id)
      draft.rail[newRail.color] = newRail
      draft.quadrants[hitCheckerboxInfo.quadrantIndex].points[hitCheckerboxInfo.pointIndex] = newHitCheckerbox
    }
  })

  const finalMove = produce(move, draft => {
    draft.origin = undefined
    draft.destination = undefined
    draft.status = MoveStatus.INITIALIZED
    draft.mode = undefined
  })
  console.log('[Revert] finalMove', finalMove)
  return { board: finalBoard, move: finalMove }
}
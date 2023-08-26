import { produce } from 'immer'
import { isColor } from '..'
import { GameError } from '../game'
import { Board } from '../../components/Board/state'
import { Checker } from '../../components/Checker/state'
import { isCheckerBox } from '../../components/CheckerBox/state/types'
import { Move, getCheckerboxCoordinates } from '.'

export const off = (board: Board, move: Move): Board | undefined => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }

  const originInfo = getCheckerboxCoordinates(board, move.origin.id)
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })
  const boardCheckers = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers
  const checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[boardCheckers.length - 1] as Checker
  if (!isColor(checkerToMove.color)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid color'
    })
  }

  let maxPosition: number = move.dieValue
  board.quadrants[originInfo.quadrantIndex].points.forEach(p => {
    if (p.checkers.length > 0) {
      maxPosition = p.position as number
    }
  })
  console.log(move)
  console.log(oldOrigin)
  console.log(maxPosition)

  if (move.dieValue === oldOrigin.position || move.dieValue >= maxPosition) {
    return produce(board, draft => {
      draft.off[checkerToMove.color].checkers.push(checkerToMove)
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    })
  } else {
    console.error('Cannot move to off from that point with current dieValue')
  }
  return board
}

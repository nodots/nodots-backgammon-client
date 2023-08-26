import { getBearOffQuadrantLocation, getHomeQuadrantLocation, isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { Quadrant, isQuadrant } from '../../components/Quadrant/state'
import { Turn, isTurn } from '../turn'
import { Move, getCheckerboxCoordinates } from '../move'
import { Board } from '../../components/Board/state'
import { isBoard } from '../../components/Board/state/types/board'
import { Player } from '../../components/Player/state/types/player'
import { MoveMode, POINT_COUNT } from '../../components/Board/state'
import { QuadrantLocation } from '../../components/Quadrant/state'
import { CheckerBox } from '../../components/CheckerBox/state'
import { MoveResult } from './reducer'
import { pointToPointReducer } from './point-to-point.reducer'
import { getCheckerBoxes } from '../../components/Board/state/types/board'

export function bearOffReducer (turn: Turn, origin: CheckerBox, dieValue: DieValue): MoveResult | undefined {
  let moveMode: MoveMode | undefined = undefined
  let destination: CheckerBox | undefined = undefined

  console.log('[BEAR OFF TRACE] turn.moves:', turn.moves)
  if (!isTurn(turn)) {
    throw Error('Invalid turn')
  }

  if (!isBoard(turn.board)) {
    throw Error('Invalid board')
  }

  const board = turn.board as Board

  if (!isPlayer(turn.player)) {
    throw Error('Invalid player')
  }

  const moveDirection = turn.player.moveDirection

  const destinationPosition = moveDirection === 'clockwise'
    ? (origin.position as number) + (dieValue as number) as number
    : (origin.position as number) - (dieValue as number) as number

  console.log('[TRACE] destinationPosition', destinationPosition)

  const bearOffQuadrant = turn.board.quadrants.find(q => q.location === getBearOffQuadrantLocation(moveDirection))
  if (!bearOffQuadrant) {
    throw Error('Invalid bearOffQuadrant')
  }

  const maxBearOffPointPosition = bearOffQuadrant.points.findLastIndex(p => p.checkers.length > 0 && p.checkers[0].color === turn.player?.color) + 1
  console.log('[TRACE] maxBearOffPointPosition', maxBearOffPointPosition)

  if (destinationPosition > 0) {
    // point-to-point move
    return pointToPointReducer(turn, origin, dieValue)
  } else if (destinationPosition === dieValue) {
    // Exact roll to bear off
    const originInfo = getCheckerboxCoordinates(board, origin.id)
    if (
      typeof originInfo.quadrantIndex !== 'number' ||
      typeof originInfo.pointIndex !== 'number'
    ) {
      throw Error('Invalid originInfo')
    }
    destination = turn.board.off[turn.player.color]
    moveMode = MoveMode.BEAR_OFF
    return { mode: moveMode, destination }
  } else if (dieValue > maxBearOffPointPosition) {
    // Die roll exceeds first point with player's checkers so use that
    destination = getCheckerBoxes(turn.board).find(cb => cb.position === maxBearOffPointPosition)
    moveMode = MoveMode.BEAR_OFF
    return { mode: moveMode, destination }
  }

  return { mode: MoveMode.ERROR, destination: undefined }
}

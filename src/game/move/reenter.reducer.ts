import { getHomeQuadrantLocation, isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { Quadrant, isQuadrant } from '../../components/Quadrant/state'
import { Turn, isTurn } from '../turn'
import { Move } from '../move'
import { Board } from '../../components/Board/state'
import { isBoard } from '../../components/Board/state/types/board'
import { Player } from '../../components/Player/state/types/player'
import { MoveMode, POINT_COUNT } from '../../components/Board/state'
import { QuadrantLocation } from '../../components/Quadrant/state'
import { CheckerBox } from '../../components/CheckerBox/state'
import { MoveResults } from './reducer'

export const reenterReducer = (turn: Turn, dieValue: DieValue): MoveResults => {
  let moveMode: MoveMode | undefined = undefined
  console.log('[TRACE] turn.moves:', turn.moves)
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

  const homeQuadrantLocation = getHomeQuadrantLocation(turn.player.moveDirection)
  console.log('[TRACE] Reenter Reducer homeQuadrantLocation:', homeQuadrantLocation)
  let homeQuadrant: Quadrant | undefined = undefined
  if (isBoard(turn.board)) {
    homeQuadrant = board.quadrants.find(q => q.location === homeQuadrantLocation)
  }

  if (!isQuadrant(homeQuadrant)) {
    throw Error('Invalid quadrant')
  }
  console.log('[TRACE] Reenter Reducer homeQuadrant:', homeQuadrant)

  const reenterPosition =
    homeQuadrant.location === QuadrantLocation.SE
      ? dieValue as number
      : POINT_COUNT - dieValue as number + 1

  console.log('[TRACE] dieValue', dieValue)
  console.log('[TRACE] reenterPosition', reenterPosition)
  const reenterPoint = homeQuadrant.points.find(p => p.position === reenterPosition)
  console.log('[TRACE] reenterPoint', reenterPoint)

  if (!reenterPoint) {
    throw Error('no reenterPoint')
  }

  if (
    reenterPoint.checkers.length === 0 ||
    (
      reenterPoint.checkers.length >= 1 &&
      reenterPoint.checkers[0].color === turn.player.color
    )
  ) {
    moveMode = MoveMode.REENTER
  } else if (
    reenterPoint.checkers.length === 1 &&
    reenterPoint.checkers[0].color !== turn.player.color
  ) {
    moveMode = MoveMode.REENTER_HIT
  } else if (
    reenterPoint.checkers.length > 1 &&
    reenterPoint.checkers[0].color !== turn.player.color
  ) {
    moveMode = MoveMode.NO_MOVE
  } else {
    moveMode = MoveMode.ERROR
  }

  return { mode: moveMode, destination: reenterPoint }
}

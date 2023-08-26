import { isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { GameError } from '../game'
import { Turn, isTurn } from '../turn'
import { MoveMode } from '../../components/Board/state'
import { isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getCheckerBoxes } from '../../components/Board/state'
import { isBoard } from '../../components/Board/state/types/board'
import { isDieValue } from '../../components/Die/state/types'
import { isPoint } from '../../components/Point/state/types'
import { MoveResult } from './reducer'

export function pointToPointReducer (turn: Turn, origin: CheckerBox, dieValue: DieValue): MoveResult | undefined {
  console.warn('[TRACE]: Start')
  let moveMode: MoveMode | undefined = undefined
  let destination: CheckerBox | undefined = undefined
  if (!isTurn) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid Turn'
    })
  }
  if (!isCheckerBox(origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid CheckerBox'
    })
  }
  if (!isDieValue(dieValue)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid DieValue'
    })
  }
  if (!isBoard(turn.board)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid Board'
    })
  }
  if (!isPlayer(turn.player)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid Turn'
    })
  }

  const moveDirection = turn.player.moveDirection

  const destinationPosition = moveDirection === 'clockwise'
    ? (origin.position as number) + (dieValue as number) as number
    : (origin.position as number) - (dieValue as number) as number

  const destinationPoint =
    getCheckerBoxes(turn.board).find(cb =>
      typeof cb.position === 'number' &&
      cb.position === destinationPosition
    )

  if (!isPoint(destinationPoint)) {
    console.log(turn)
    console.log(origin)
    console.log(dieValue)
    console.error(destinationPoint)
    throw new GameError({
      model: 'Game',
      errorMessage: 'Invalid destinationPoint'
    })
  }
  console.warn('[TRACE] p2p reducer setting MoveMode')
  if (
    destinationPoint.checkers.length === 1 &&
    destinationPoint.checkers[0].color !== turn.player.color
  ) {
    console.warn('[TRACE] p2p reducer setting MoveMode: POINT_TO_POINT_HIT')
    moveMode = MoveMode.POINT_TO_POINT_HIT
  } else if (
    destinationPoint.checkers.length === 0 ||
    (
      destinationPoint.checkers.length > 0 &&
      destinationPoint.checkers[0].color === turn.player.color
    )
  ) {
    console.warn('[TRACE] p2p reducer setting MoveMode: POINT_TO_POINT')
    moveMode = MoveMode.POINT_TO_POINT
  } else if (
    destinationPoint.checkers.length > 1 &&
    destinationPoint.checkers[0].color !== turn.player.color

  ) {
    console.warn('[TRACE] p2p reducer setting MoveMode: NO_MOVE')

    moveMode = MoveMode.NO_MOVE
  } else {
    console.warn('[TRACE] p2p reducer setting MoveMode: ERROR')
    moveMode = MoveMode.ERROR
  }

  console.warn('[TRACE]: End. moveMode:', MoveMode[moveMode])
  return { mode: moveMode, destination: destinationPoint }
}

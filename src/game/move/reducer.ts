import { produce } from 'immer'
import { isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { isColor, CHECKERS_PER_PLAYER } from '../game'
import { GameError } from '../game'
import { Move } from '../move'
import { Turn, isTurn } from '../turn'
import { Checker } from '../../components/Checker/state'
import { MoveMode } from '../../components/Board/state'
import { MoveStatus, isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'
import { getCheckerBoxes } from '../../components/Board/state'
import { getHomeQuadrantLocation } from '../../components/Player/state/types/player'
import { isBoard } from '../../components/Board/state/types/board'
import { reenterReducer } from './reenter.reducer'
import { bearOffReducer } from './bear-off.reducer'
import { pointToPointReducer } from './point-to-point.reducer'

export interface MoveResults {
  mode: MoveMode,
  destination: CheckerBox | undefined
}

export const reducer = (state: Turn, origin: CheckerBox): Move => {
  let moveResults: MoveResults = { mode: MoveMode.ERROR, destination: undefined }
  let activeMove = state.moves.find((m: Move) => (m.status === MoveStatus.INITIALIZED)) as Move
  if (!isBoard(state.board)) {
    console.log(state.board)
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid board'
    })
  }
  if (!isPlayer(state.player)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid player'
    })
  }
  const activePlayer = state.player
  if (!isColor(activePlayer.color)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid color'
    })
  }

  console.log('[TRACE] state.moves', state.moves)

  let checkerToMove: Checker | undefined = undefined
  let destination: CheckerBox | undefined = undefined
  let revertOrigin: CheckerBox | undefined = undefined
  let revertDestination: CheckerBox | undefined = undefined
  let moveMode: MoveMode | undefined
  moveResults = getMoveMode(state, activeMove.dieValue, origin)
  console.log('[TRACE] moveResults:', moveResults)
  console.log('[TRACE] moveMode:', MoveMode[moveResults.mode])
  checkerToMove = origin.checkers[origin.checkers.length - 1]
  return produce(activeMove, draft => {
    draft.origin = origin
    draft.mode = moveResults.mode
    draft.checker = checkerToMove
    draft.status = MoveStatus.COMPLETED
    draft.destination = moveResults.destination
  })
}

function getMoveMode (turn: Turn, dieValue: DieValue, origin: CheckerBox): MoveResults {
  let moveResults: MoveResults = { mode: MoveMode.ERROR, destination: undefined }
  if (dieValue === undefined) {
    console.error('You need to roll first')
  }
  console.log('getMoveMode turn', turn)
  console.log('getMoveMode dieValue', dieValue)
  console.log('getMoveMode origin', origin)

  if (!isTurn(turn)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid turn'
    })
  }

  if (!isBoard(turn.board)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid board'
    })
  }

  if (!isPlayer(turn.player)) {
    throw new GameError({
      model: 'Turn',
      errorMessage: 'Invalid player'
    })
  }

  if (!isCheckerBox(origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid origin'
    })
  }

  let totalBearOffCheckers = turn.board.off[turn.player.color].checkers.length
  const bearOffQuadrantLocation = getBearOffQuadrantLocation(turn.player.moveDirection)
  const bearOffQuadrant = turn.board.quadrants.find(q => q.location === bearOffQuadrantLocation)
  if (bearOffQuadrant === undefined) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid bear-off quadrant'
    })
  }
  bearOffQuadrant.points.forEach(p => {
    if (p.checkers.length > 0 && p.checkers[0].color === turn.player?.color) {
      totalBearOffCheckers += p.checkers.length
    }
  })

  if (origin.position === 'rail') {
    moveResults = reenterReducer(turn, dieValue)
  } else if (totalBearOffCheckers === CHECKERS_PER_PLAYER) {
    moveResults = bearOffReducer(turn, origin, dieValue)
    console.log(moveResults)
  } else {
    moveResults = pointToPointReducer(turn, origin, dieValue)
  }
  return { mode: moveResults.mode, destination: moveResults.destination }
}


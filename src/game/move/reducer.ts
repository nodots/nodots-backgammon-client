import { produce } from 'immer'
import { isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { isColor, generateId, CHECKERS_PER_PLAYER } from '../game'
import { GameError } from '../game'
import { Move, isMove } from '../move'
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

export interface MoveResult {
  mode: MoveMode,
  destination: CheckerBox | undefined
}

export const isMoveResult = (mr: any): mr is MoveResult => {
  if (typeof mr !== 'object') {
    return false
  }
  return true
}

export const reducer = (state: Turn, origin: CheckerBox): Move | undefined => {
  console.warn('[TRACEMOVE] move reducer')
  let moveResults: MoveResult | undefined = undefined
  let activeMove = state.moves.find((m: Move) => (m.status === MoveStatus.INITIALIZED)) as Move
  if (!activeMove) {
    console.warn('[TRACEMOVE] move reducer noActiveMove')
    return moveResults
  }
  console.warn('[TRACEMOVE] move reducer activeMove', activeMove)
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

  console.log('[TRACEMOVE] state.moves', state.moves)
  state.moves.forEach(m => {
    console.log(m.origin)
    if (m.mode) {
      console.log('[TRACEMOVE] ', MoveMode[m.mode])
    } else {
      console.log('[TRACEMOVE] no moveMode')
    }
  })

  let checkerToMove: Checker | undefined = undefined
  let destination: CheckerBox | undefined = undefined
  let revertOrigin: CheckerBox | undefined = undefined
  let revertDestination: CheckerBox | undefined = undefined
  let moveMode: MoveMode | undefined
  if (!activeMove) {
    console.error('You must roll first')
    return moveResults
  }
  moveResults = getMoveMode(state, activeMove.dieValue, origin)
  console.log('[TRACEMOVE] moveResults:', moveResults)
  checkerToMove = origin.checkers[origin.checkers.length - 1]
  return produce(activeMove, draft => {
    if (isMoveResult(moveResults)) {
      draft.origin = origin
      draft.mode = moveResults.mode
      draft.checker = checkerToMove
      draft.status = MoveStatus.COMPLETED
      draft.destination = moveResults.destination
    } else {
      draft.origin = undefined
      draft.destination = undefined
      draft.mode = undefined
      draft.checker = undefined
      draft.status = MoveStatus.NO_MOVE

    }
  })
}

function getMoveMode (turn: Turn, dieValue: DieValue, origin: CheckerBox): MoveResult | undefined {
  let moveResults: MoveResult | undefined = undefined
  if (dieValue === undefined) {
    console.error('You need to roll first')
  }
  // console.warn('[TRACEMOVE] getMoveMode turn', turn)
  // console.warn('[TRACEMOVE] getMoveMode dieValue', dieValue)
  // console.warn('[TRACEMOVE] getMoveMode origin', origin)

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
      errorMessage: '[TRACEMOVE] Invalid bear-off quadrant'
    })
  }
  bearOffQuadrant.points.forEach(p => {
    if (p.checkers.length > 0 && p.checkers[0].color === turn.player?.color) {
      totalBearOffCheckers += p.checkers.length
    }
  })
  if (turn.board.rail[turn.player.color].checkers.length > 0) {
    if (origin.position !== 'rail') {
      console.warn('[TRACEMOVE] You have checkers on the rail and must move those first')
    } else {
      console.warn('[TRACEMOVE] calling reenterReducer')
      moveResults = reenterReducer(turn, dieValue)
      console.warn('[TRACEMOVE] reenterReducer moveResults', moveResults)
      if (isMove(moveResults)) {
        console.warn('[TRACEMOVE] reenter moveMode:', MoveMode[moveResults.mode])
      } else {
        console.warn('[TRACEMOVE] COULD NOT REENTER')
      }
    }
  } else if (totalBearOffCheckers === CHECKERS_PER_PLAYER) {
    console.warn('[TRACEMOVE] calling bearOffReducer')
    moveResults = bearOffReducer(turn, origin, dieValue)
  } else {
    console.warn('[TRACEMOVE] origin:', origin)
    console.warn('[TRACEMOVE] moveResults:', moveResults)
    console.warn('[TRACEMOVE] calling pointToPointReducer')
    moveResults = pointToPointReducer(turn, origin, dieValue)
    console.warn('[TRACEMOVE] back from pointToPointReducer moveResults:', moveResults)
    console.warn('[TRACEMOVE] back from pointToPointReducer moveResults.mode:', MoveMode[moveResults?.mode])
  }
  console.warn('[TRACEMOVE] isMoveResult(moveResults):', isMoveResult(moveResults))

  if (isMoveResult(moveResults)) {
    return { mode: moveResults.mode, destination: moveResults.destination }
  } else {

    return moveResults
  }
}


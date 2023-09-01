import { produce } from 'immer'
import { getHomeQuadrantLocation, isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { isColor, generateId, CHECKERS_PER_PLAYER } from '../game'
import { GameError } from '../game'
import { Player } from '../../components/Player/state'
import { Move, isMove, off, pointToPoint } from '../move'
import { Turn, isTurn } from '../turn'
import { Checker } from '../../components/Checker/state'
import { MoveMode } from '../../components/Board/state'
import { MoveStatus, isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'
import { Board, getCheckerBoxes } from '../../components/Board/state/types/board'
import { reenter } from '../move'
import { reenterReducer } from './reenter.reducer'
import { bearOffReducer } from './bear-off.reducer'
import { pointToPointReducer } from './point-to-point.reducer'
import { isPoint } from '../../components/Point/state/types'
import { isQuadrant } from '../../components/Quadrant/state'

export interface MoveResult {
  move: Move
  board: Board
}

export const isMoveResult = (mr: any): mr is MoveResult => {
  if (typeof mr !== 'object') {
    return false
  }
  return true
}

export const reducer = (turn: Turn, origin: CheckerBox): Turn => {
  let moveResult: MoveResult | undefined = undefined
  const activeMove = turn.moves.find(m => m.status === MoveStatus.INITIALIZED)

  if (isMove(activeMove)) {
    const newMove = produce(activeMove, draft => {
      draft.origin = origin
    })
    const moveMode = getMoveMode(turn, origin, activeMove.dieValue)
    switch (moveMode) {
      case MoveMode.REENTER:
        moveResult = reenter(turn.board, newMove)
        return produce(turn, draft => {
          if (isMoveResult(moveResult)) {
            draft.board = moveResult.board
            draft.moves[activeMove.order] = moveResult.move
          }
        })

      case MoveMode.POINT_TO_POINT:
        moveResult = pointToPoint(turn.board, newMove)
        return produce(turn, draft => {
          if (isMoveResult(moveResult)) {
            draft.board = moveResult.board
            draft.moves[activeMove.order] = moveResult.move
          }
        })
      case MoveMode.NO_MOVE:
      default:
        return turn
    }
  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No activeMove'
    })
  }
  return turn
}

function getMoveMode (turn: Turn, origin: CheckerBox, dieValue: DieValue): MoveMode {
  let moveMode = MoveMode.ERROR
  if (isReenter(turn.board, turn.player)) {
    moveMode = MoveMode.REENTER
  } else if (canBearOff(turn.board, turn.player)) {
    moveMode = MoveMode.BEAR_OFF
  } else {
    // P2P or NO_MOVE
    if (typeof origin.position === 'number') {
      const destinationPosition =
        turn.player.moveDirection === 'clockwise'
          ? origin.position + dieValue
          : origin.position - dieValue

      const destinationPoint = getCheckerBoxes(turn.board).find(cb => cb.position === destinationPosition)
      if (isPoint(destinationPoint)) {
        if (
          // No checkers, go for it
          destinationPoint.checkers.length === 0
          ||
          (
            // One opponent checker, hit it
            (destinationPoint.checkers.length === 1 && destinationPoint.checkers[0].color !== turn.player.color)
            ||
            // Player owns the point
            (destinationPoint.checkers.length >= 1 && destinationPoint.checkers.filter(c => c.color !== turn.player.color).length === 0)
          )
        ) {
          moveMode = MoveMode.POINT_TO_POINT
        } else {
          moveMode = MoveMode.NO_MOVE
        }
      } else {
        moveMode = MoveMode.NO_MOVE
      }
    }

  }
  return moveMode
}

function canBearOff (board: Board, player: Player): boolean {
  let bearOff = false

  const bearOffQuadrantLocation = getBearOffQuadrantLocation(player.moveDirection)
  const bearOffQuadrant = board.quadrants.find(q => q.location === bearOffQuadrantLocation)
  if (!isQuadrant(bearOffQuadrant)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No bearoff quadrant'
    })
  }
  const playersOff = board.off[player.color]
  const offCheckerCount = playersOff.checkers.length
  let bearOffCheckerCount = offCheckerCount

  bearOffQuadrant.points.forEach(p => bearOffCheckerCount += p.checkers.length)
  if (bearOffCheckerCount === CHECKERS_PER_PLAYER) {
    bearOff = true
  }


  return bearOff
}

function isReenter (board: Board, player: Player): boolean {
  let isReenter = false
  if (board.rail[player.color].checkers.length > 0) {
    isReenter = true
  }
  return isReenter
}

function getMoveDestination (board: Board, player: Player, dieValue: DieValue, origin: CheckerBox): MoveResult | undefined {
  let moveResults: MoveResult | undefined = undefined

  console.warn('[TRACEMOVE] getMoveDestination turn', turn)
  console.warn('[TRACEMOVE] getMoveDestination dieValue', dieValue)
  console.warn('[TRACEMOVE] getMoveDestination origin', origin)

  if (!isCheckerBox(origin)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid origin'
    })
  }

  let totalBearOffCheckers = board.off[player.color].checkers.length
  const bearOffQuadrantLocation = getBearOffQuadrantLocation(player.moveDirection)
  const bearOffQuadrant = board.quadrants.find(q => q.location === bearOffQuadrantLocation)
  if (bearOffQuadrant === undefined) {
    throw new GameError({
      model: 'Move',
      errorMessage: '[TRACEMOVE] Invalid bear-off quadrant'
    })
  }
  bearOffQuadrant.points.forEach(p => {
    if (p.checkers.length > 0 && p.checkers[0].color === player.color) {
      totalBearOffCheckers += p.checkers.length
    }
  })

  if (board.rail[player.color].checkers.length > 0) {
    {
      console.warn('REENTERING dieValue', dieValue)
      const checkerToMove = board.rail[player.color].checkers[board.rail[player.color].checkers.length - 1]
      // Where can we move? Back to our home quadrant.
      if (player !== undefined) {

        const homeQuadrant = board.quadrants.find(q => q.location === getHomeQuadrantLocation(player.moveDirection))
        console.warn('REENTERING to homeQuadrant:', homeQuadrant)

      }

      // console.warn('[FUCKED TRACEMOVE] calling reenterReducer turn', turn)
      // moveResults = reenterReducer(turn, dieValue)
      // console.warn('[FUCKED TRACEMOVE] reenterReducer moveResults', moveResults)
      // if (isMove(moveResults)) {
      //   console.warn('[FUCKED TRACEMOVE] reenter moveMode:', MoveMode[moveResults.mode])
      // } else {
      //   console.warn('[FUCKED TRACEMOVE] COULD NOT REENTER')
      // }
    }
  }
  //  else if (totalBearOffCheckers === CHECKERS_PER_PLAYER) {
  //   console.warn('[TRACEMOVE] calling bearOffReducer')
  //   moveResults = bearOffReducer(turn, origin, dieValue)
  // } else {
  //   console.log('[FUCKED HERE]')
  //   console.warn('[TRACEMOVE] origin:', origin)
  //   console.warn('[TRACEMOVE] dieValue', dieValue)
  //   console.warn('[TRACEMOVE] moveResults:', moveResults)
  //   console.warn('[TRACEMOVE] calling pointToPointReducer')
  //   moveResults = pointToPointReducer(turn, origin, dieValue)
  //   console.warn('[TRACEMOVE] back from pointToPointReducer moveResults!!!:', moveResults)
  //   console.warn('[TRACEMOVE] back from pointToPointReducer moveResults.mode:', MoveMode[moveResults?.mode])
  // }
  // if (isMoveResult(moveResults)) {
  //   return { mode: moveResults.mode, destination: moveResults.destination }
  // } else {
  //   return moveResults
  // }
  return undefined
}


import { produce } from 'immer'
import { getHomeQuadrantLocation, isPlayer } from '../../components/Player/state/types/player'
import { DieValue } from '../../components/Die/state'
import { GameError } from '../game'
import { Player } from '../../components/Player/state'
import { Move, isMove, pointToPoint, reenter } from '../move'
import { Turn, isTurn } from '../turn'
import { MoveMode } from '../../components/Board/state'
import { MoveStatus, isCheckerBox, CheckerBox } from '../../components/CheckerBox/state'
import { getBearOffQuadrantLocation } from '../../components/Player/state'
import { Board, getCheckerBoxes } from '../../components/Board/state/types/board'
import { isPoint } from '../../components/Point/state/types'
import { bearOff, canBearOff } from './bear-off'

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
  console.log(origin.checkers)

  let moveResult: MoveResult | undefined = undefined
  let activeMove = turn.moves.find(m => m.status === MoveStatus.INITIALIZED)

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
            if (isMove(activeMove)) {
              draft.moves[activeMove.order] = moveResult.move
            }
          }
        })
      case MoveMode.BEAR_OFF:
        moveResult = bearOff(turn.board, newMove)
        return produce(turn, draft => {
          if (isMoveResult(moveResult)) {
            draft.board = moveResult.board
            if (isMove(activeMove)) {
              draft.moves[activeMove.order] = moveResult.move
            }
          }
        })
      case MoveMode.POINT_TO_POINT:
        moveResult = pointToPoint(turn.board, newMove)
        return produce(turn, draft => {
          if (isMoveResult(moveResult)) {
            draft.board = moveResult.board
            if (isMove(activeMove)) {
              draft.moves[activeMove.order] = moveResult.move
            }
          }
        })
      case MoveMode.NO_MOVE:
        return produce(turn, draft => {
          if (isMove(activeMove)) {
            draft.moves[activeMove.order].status = MoveStatus.NO_MOVE
            draft.moves[activeMove.order].mode = MoveMode.NO_MOVE
          }
        })
      default:
        return turn
    }
  } else {
    console.error('Move completed.')
  }
}

function getMoveMode (turn: Turn, origin: CheckerBox, dieValue: DieValue): MoveMode {
  let moveMode = MoveMode.ERROR
  if (isReenter(turn.board, turn.player)) {
    moveMode = MoveMode.REENTER
  } else if (canBearOff(turn.board, dieValue, turn.player)) {
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
          destinationPoint.checkers.length === 0 ||
          // Player owns the point
          (destinationPoint.checkers.length >= 1 && destinationPoint.checkers.filter(c => c.color !== turn.player.color).length === 0) ||
          // Can hit an opponent's checker
          (destinationPoint.checkers.length === 1 && destinationPoint.checkers[0].color !== turn.player.color)) {
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


function isReenter (board: Board, player: Player): boolean {
  let isReenter = false
  if (board.rail[player.color].checkers.length > 0) {
    isReenter = true
  }
  return isReenter
}

function getMoveDestination (board: Board, player: Player, dieValue: DieValue, origin: CheckerBox): MoveResult | undefined {
  let moveResults: MoveResult | undefined = undefined

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
      const checkerToMove = board.rail[player.color].checkers[board.rail[player.color].checkers.length - 1]
      // Where can we move? Back to our home quadrant.
      if (player !== undefined) {
        const homeQuadrant = board.quadrants.find(q => q.location === getHomeQuadrantLocation(player.moveDirection))
      }
    }
  }
  return undefined
}


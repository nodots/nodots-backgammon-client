import { generateId, GameError } from '.'
import { Player } from '../components/Player/state/types/player'
import { Board, Move, MoveStatus } from '../components/Board/state/types'
import { DieValue, Roll } from '../components/Die/state/types'
import { POINT_COUNT } from '../components/Board/state/types/board'
import { QuadrantLocation } from '../components/Quadrant/state'

export const MOVES_PER_TURN = 2

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  AWAITING_FINALIZATION,
  FINALIZED,
  ERROR,
  NO_MOVES
}

export type Turn = {
  id: string | undefined
  board: Board | undefined
  player: Player | undefined
  status: TurnStatus | undefined
  roll: Roll | undefined
  moves: Move[]
}

export const initializeMoves = (board: Board, roll: Roll, player: Player): Move[] => {
  let moveCount = MOVES_PER_TURN
  const moves: Move[] = []
  // Handle double roll
  if (roll[0] === roll[1]) {
    moveCount = moveCount * 2
  }
  for (let i = 0; i < moveCount; i++) {
    const dieValue = i % 2 ? roll[1] : roll[0]
    const move: Move = {
      id: generateId(),
      dieValue,
      status: canMove(board, dieValue, player) ? MoveStatus.INITIALIZED : MoveStatus.NO_MOVE
    }
    moves.push(move)
  }
  return moves
}

function canMove (board: Board, dieValue: DieValue, player: Player): boolean {
  if (board.rail[player.color].checkers.length > 0) {
    console.log('Player has to reenter')
    const homeQuadrant = board.quadrants.find(q => q.location === player.homeQuadrantLocation)
    if (homeQuadrant === undefined) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No home quadrant for player'
      })
    }
    // if home quadrant = 0, roll = position
    //
    const pointPosition = homeQuadrant.location === QuadrantLocation.SE ? dieValue : POINT_COUNT - dieValue + 1

    const point = homeQuadrant.points.find(p => p.position === pointPosition)

    if (point === undefined) {
      console.log(pointPosition)
      console.log(dieValue)
      throw new GameError({
        model: 'Move',
        errorMessage: 'Could not find point to reenter'
      })
    }

    if (point.color && point.color !== player.color) {
      return false
    } else {
      console.log(dieValue)
      console.log(point)
    }
    return true
  }

  return true
}
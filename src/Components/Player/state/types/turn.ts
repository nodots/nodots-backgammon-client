import { generateId } from '../../../../models'
import { Player } from './player'
import { Move, MoveStatus } from '../../../Board/state/types'
import { Roll } from '../../../Die/state/types'

export const MOVES_PER_TURN = 2

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  COMPLETED,
  ERROR,
}

export type Turn = {
  id: string | undefined
  player: Player | undefined
  status: TurnStatus | undefined
  roll: Roll | undefined
  moves: Move[]
}

export const initializeMoves = (roll: Roll): Move[] => {
  let moveCount = MOVES_PER_TURN
  const moves: Move[] = []
  // Handle double roll
  if (roll[0] === roll[1]) {
    moveCount = moveCount * 2
  }
  for (let i = 0; i < moveCount; i++) {
    const move: Move = {
      id: generateId(),
      dieValue: i % 2 ? roll[0] : roll[1],
      status: MoveStatus.INITIALIZED
    }
    moves.push(move)
  }
  return moves
}
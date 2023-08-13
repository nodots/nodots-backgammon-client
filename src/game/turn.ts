import { generateId } from '.'
import { Player } from '../components/Player/state/types/player'
import { Move, MoveStatus } from '../components/Board/state/types'
import { Roll } from '../components/Die/state/types'

export const MOVES_PER_TURN = 2

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  AWAITING_FINALIZATION,
  FINALIZED,
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
      dieValue: i % 2 ? roll[1] : roll[0],
      status: MoveStatus.INITIALIZED
    }
    moves.push(move)
  }
  return moves
}
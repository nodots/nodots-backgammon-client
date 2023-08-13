import { Color, generateId, MoveDirection } from '../../../../game'
import { Move } from '../../../Board/state/types'
import { Roll, DiePair } from '../../../Die/state/types'
import { Turn, TurnStatus, initializeMoves } from '../../../../game/turn'

export interface InitializeTurnAction {
  player: Player,
  roll: Roll
}

export type Player = {
  id: string,
  color: Color
  active: boolean
  dice: DiePair
  moveDirection: MoveDirection
  initializeTurn?: (action: InitializeTurnAction) => void
}

export const initializeTurn = (action: InitializeTurnAction): Turn => {
  const moves: Move[] = initializeMoves(action.roll)
  const turn: Turn = {
    id: generateId(),
    player: action.player,
    roll: action.roll,
    status: TurnStatus.INITIALIZED,
    moves: moves
  }
  return turn
}
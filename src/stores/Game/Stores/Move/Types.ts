import { MoveDirection } from '../../Types'
import { DieValue } from '../../types/Dice'

export interface NodotsMove {
  id: string
  isAuto: boolean
  isForced: boolean
  dieValue: DieValue
  direction: MoveDirection
}

export interface MoveInitializing extends NodotsMove {
  kind: 'move-initializing'
}

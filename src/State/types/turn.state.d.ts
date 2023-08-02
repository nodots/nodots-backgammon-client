import { Die } from './Die'
import { Player } from './Player'
import { Move } from './Move'
import { DieValue, generateId } from '.'
import { TurnStatus } from '../../models/Turn'

export interface TurnState {
  id: string
  player: Player
  dice: [Die, Die]
  status: TurnStatus
  moves: Move[] = []

}
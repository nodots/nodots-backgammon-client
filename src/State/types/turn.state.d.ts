import { Player } from './Player'
import { Move } from './Move'
import { TurnStatus, Roll } from '../../models/Turn'

export interface TurnState {
  id: string | undefined
  player: Player | undefined
  roll: Roll | undefined
  status: TurnStatus | undefined
  moves: Move[] = []

}
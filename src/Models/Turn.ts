import { Die } from './Die'
import { Player } from './Player'
import { Move } from './Move'
import { GameError } from '.'
import { DieValue, generateId } from '.'

export type Roll = [DieValue, DieValue]

export enum TurnStatus {
  INITIALIZED,
  MOVES_SET,
  ORIGIN_SET,
  DESTINATION_SET,
  MOVE_IN_PROGRESS,
  MOVE_COMPLETED,
  MOVE_FAILED
}

export class Turn {
  id: string
  player: Player
  roll: Roll
  status: TurnStatus
  moves: Move[] = []

  constructor (player: Player, roll: Roll) {
    this.id = generateId()
    this.player = player
    this.roll = roll
    this.status = TurnStatus.INITIALIZED
    let moveCount = 2

    if (!this.roll[0] || !this.roll[1]) {
      throw new GameError({ model: 'Turn', errorMessage: 'Dice have no values' })
    }

    // If the player rolls doubles, they get two extra moves.
    if (this.roll[0] === this.roll[1]) {
      moveCount = 2
    }

    for (let i = 0; i < moveCount; i++) {
      const dieValue: DieValue = i % 2 ? this.roll[0] : this.roll[1]
      this.moves.push(new Move(dieValue))
    }

  }
}
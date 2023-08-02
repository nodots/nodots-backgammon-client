import { Die } from './Die'
import { Player } from './Player'
import { Move } from './Move'
import { GameError } from '.'
import { DieValue, generateId } from '.'

export type Roll = [Die, Die]

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
  dice: [Die, Die]
  status: TurnStatus
  moves: Move[] = []

  constructor (player: Player, dice: Roll) {
    this.id = generateId()
    this.player = player
    this.dice = dice
    this.status = TurnStatus.INITIALIZED
    let moveCount = 2

    if (!this.dice[0].value || !this.dice[1].value) {
      throw new GameError({ model: 'Turn', errorMessage: 'Dice have no values' })
    }

    if (dice[0].value === dice[1].value) {
      moveCount = 2
    }

    // If the player rolls doubles, they get two extra moves.
    for (let i = 0; i < moveCount; i++) {
      const dieValue: DieValue = i % 2 ? this.dice[0].value : this.dice[1].value
      this.moves.push(new Move(dieValue))
    }

  }
}
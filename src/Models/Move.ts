import { MoveType } from '.'
import { Player } from './Player'

export class Move {
  player: Player
  move: MoveType

  constructor (player: Player, move: MoveType) {
    this.player = player
    this.move = move
  }

}
import { CheckerMoveType, MoveType } from '.'
import { Board } from './Board'
import { CheckerBox } from './CheckerBox'
import { Player } from './Player'


export class Move {
  player: Player
  move: MoveType

  constructor (player: Player, move: MoveType) {
    this.player = player
    this.move = move

  }
}
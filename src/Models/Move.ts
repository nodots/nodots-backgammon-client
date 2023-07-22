import { Board } from './Board'
import { CheckerBox } from './CheckerBox'
import { Player } from './Player'

export type CheckerMoveType = {
  checker: 1 | 2,
  origin: CheckerBox | undefined,
  destination: CheckerBox | undefined
  completed: boolean | undefined
}


export type MoveType = {
  board: Board,
  checker: CheckerMoveType,
  origin: CheckerBox,
  destination: CheckerBox,
  completed: boolean
}

export class Move {
  player: Player
  move: MoveType

  constructor (player: Player, move: MoveType) {
    this.player = player
    this.move = move

  }
}
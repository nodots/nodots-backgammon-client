import { Point } from './Point'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { generateId, Color } from './Backgammon'

export interface GameParams {
  id: string
  cube: Cube
  board: Board
  checkers: Checker[]
}

export class Game {
  id: string
  cube: Cube
  players: {
    black: Player
    white: Player,
  }
  checkers: {
    black: Checker[],
    white: Checker[]
  }
  board: Board

  constructor (whitePlayer: Player, blackPlayer: Player, board: Board) {
    this.id = generateId()
    this.cube = new Cube()
    this.players = {
      black: blackPlayer,
      white: whitePlayer
    }
    this.checkers = {
      black: [],
      white: []
    }
    this.board = board
    this.setCheckers()
    this.rollForStart()
    this.players.black.move()
  }

  // FIXME: Or at least watch me. It may be really stupid
  private setCheckers (): void {
    const checkers: { black: Checker[], white: Checker[] } = this.getCheckers()
    this.checkers.black = checkers.black
    this.checkers.white = checkers.white
    this.players.black.checkers = checkers.black
    this.players.white.checkers = checkers.black

    this.setCheckerPoints()

  }

  private setCheckerPoints (): void {
    const checkers = [...this.checkers.black, this.checkers.white]
    console.log(checkers)
  }

  getCheckers (): { black: Checker[], white: Checker[] } {
    return {
      black: this.getCheckersByColor('black'),
      white: this.getCheckersByColor('white')
    }
  }

  getCheckersByColor (color: Color): Checker[] {
    // console.log(`getCheckersByColor ${color.toString()}`)
    let checkers: Checker[] = []
    if (!this.board) {
      throw Error('We have no board')
    }
    checkers = this.board.getCheckersByColor(color)
    return checkers
  }

  private getPoints (): Point[] {
    const points: Point[] = []
    this.board?.quadrants.forEach((q: Quadrant) => {
      points.concat(q.points)
    })
    return points
  }

  rollForStart = () => {
    if (this.players.white.dice && this.players.black.dice) {
      return [this.players.white.dice[0].roll(), this.players.black.dice[0].roll()]
    }
  }
}

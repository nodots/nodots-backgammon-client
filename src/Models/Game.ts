import { Point } from './Point'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { generateId, Color } from '.'

export interface GameParams {
  id: string
  cube: Cube
  board: Board
  checkers: Checker[]
  activePlayer: Player
}

export class Game {
  id: string
  cube: Cube
  players: {
    black: Player
    white: Player,
  }
  board: Board
  rollForStart?: () => Color

  constructor (whitePlayer: Player, blackPlayer: Player) {
    this.id = generateId()
    this.cube = new Cube()
    this.players = {
      black: blackPlayer,
      white: whitePlayer
    }
    this.board = Board.initialize()

    this.setCheckers()
      .then(() => {
        console.log('Let the game begin!')
        // const firstMover = this.rollForStart() as Color
        // if (!firstMover) {
        //   throw Error('Nobody won the roll')
        // }
        // console.log(`${firstMover} wins roll`)
        // const player: Player = this.players[firstMover]
        // player.active = true
      })
  }

  setActivePlayer (color: Color) {
    this.players.white.active = false
    this.players.black.active = false
    this.players[color].active = true
  }

  private async setCheckers (): Promise<void> {
    const checkers: { black: Checker[], white: Checker[] } = this.getCheckers()
    this.players.black.checkers = checkers.black
    this.players.white.checkers = checkers.white
  }

  getCheckers (): { black: Checker[], white: Checker[], all: Checker[] } {
    const black = this.getCheckersByColor('black')
    const white = this.getCheckersByColor('white')
    const all = black.concat(white)
    return {
      black,
      white,
      all
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

  static rollForStart (black: Player, white: Player): Color {
    const blackRollResult = black.roll()
    const whiteRollResult = white.roll()
    // can't tie when you roll for start
    if (blackRollResult === whiteRollResult) {
      this.rollForStart(black, white)
    }
    return blackRollResult > whiteRollResult ? 'black' : 'white'

  }

  private getPoints (): Point[] {
    const points: Point[] = []
    this.board?.quadrants.forEach((q: Quadrant) => {
      points.concat(q.points)
    })
    return points
  }


}


import { GameError } from '.'
import { Point } from './Point'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { generateId, modelDebug, Color } from '.'

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

  constructor ({ whitePlayer, blackPlayer }: { whitePlayer: Player; blackPlayer: Player }) {
    this.id = generateId()
    this.cube = new Cube()
    this.players = {
      black: blackPlayer,
      white: whitePlayer
    }
    this.board = Board.initialize()

    this.setCheckers()
      .then(() => {
        if (modelDebug) {
          console.log('Let the game begin!')
        }
      })
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
      throw new GameError({ model: 'Game', errorMessage: 'We have no board' })
    }
    checkers = this.board.getCheckersByColor(color)
    return checkers
  }

  static rollForStart ({ black, white }: { black: Player; white: Player }): Color {
    const blackRollResult = black.roll()
    const whiteRollResult = white.roll()
    // can't tie when you roll for start
    if (blackRollResult === whiteRollResult) {
      this.rollForStart({ black, white })
    }
    return blackRollResult > whiteRollResult ? 'black' : 'white'
  }

  static getActivePlayer (players: { white: Player, black: Player }): Player | undefined {
    let player: Player | undefined = undefined
    if (!players.white.active && !players.black.active) {
      throw new GameError({ model: 'Game', errorMessage: 'There is no active player' })
    }
    if (players.white.active && players.black.active) {
      throw new GameError({ model: 'Game', errorMessage: 'There are two active players' })
    }

    player = players.black.active ? players.black : players.white
    return player
  }

  private getPoints (): Point[] {
    const points: Point[] = []
    this.board?.quadrants.forEach((q: Quadrant) => {
      points.concat(q.points)
    })
    return points
  }
}


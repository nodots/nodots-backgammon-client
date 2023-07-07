import { Point } from './Point'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Player } from './Player'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { generateId, Color, GameMove } from '.'

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
  onMove: (move: GameMove) => GameMove
  onRollForStart: () => Color
  onSetActivePlayer: (color?: Color) => void

  constructor (whitePlayer: Player, blackPlayer: Player) {
    this.id = generateId()
    this.cube = new Cube()
    this.players = {
      black: blackPlayer,
      white: whitePlayer
    }
    this.board = Board.initialize()
    this.onMove = (move: GameMove) => {
      const checker = move.startPoint.checkerBox.checkers.pop()

      if (!checker) {
        throw Error('No checker to move')
      }
      console.log(`Moving ${checker.color.toString()} checker id ${checker.id}`)
      move.startPoint.checkerBox.checkers.push(checker)
      return move
    }

    this.onRollForStart = (): Color => {
      if (!this.players.white.dice || !this.players.black.dice) {
        throw Error('No dice assigned to one or both players')
      }
      const whiteResult = this.players.white.dice[0].roll()
      const blackResult = this.players.white.dice[0].roll()
      return whiteResult > blackResult ? 'white' : 'black'
    }

    this.onSetActivePlayer = (color?: Color) => {
      if (color) {
        this.players.white.active = false
        this.players.black.active = false
        this.players[color].active = true
      }
    }

    // move(params: GameMove): void {
    //   console.log(params)
    // }


    this.setCheckers()
      .then(() => {
        console.log('Let the game begin!')
        const firstMover = this.rollForStart()
        console.log(`${firstMover} wins roll`)
        this.players[firstMover].active = true
      })
  }

  private async setCheckers (): Promise<void> {
    const checkers: { black: Checker[], white: Checker[] } = this.getCheckers()
    this.players.black.checkers = checkers.black
    this.players.white.checkers = checkers.white
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

  rollForStart = (): Color => {
    if (!this.players.white.dice || !this.players.black.dice) {
      throw Error('Player with no dice')
    }
    const whiteRoll = this.players.white.dice[0].roll()
    const blackRoll = this.players.black.dice[0].roll()

    if (whiteRoll === blackRoll) {
      console.log('Rolled doubles to start. Re-rolling')
      this.rollForStart()
    }

    return whiteRoll > blackRoll ? 'white' : 'black'
  }
}

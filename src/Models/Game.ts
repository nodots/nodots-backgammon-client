import { Point } from './Point'
import { Die } from './Die'
import { Checker } from './Checker'
import { Cube } from './Cube'
import { Player } from './Player'
import { Rail } from './Rail'
import { Board } from './Board'
import { Quadrant } from './Quadrant'
import { generateId, NUMBER_POINTS, Color, CHECKERS_PER_PLAYER, InitBoardSetup } from './Backgammon'

export class Game {
  id: string
  board: Board
  cube: Cube
  whitePlayer: Player
  blackPlayer: Player

  rail = new Rail()

  constructor(whitePlayer: Player, blackPlayer: Player) {
    this.id = generateId()
    this.cube = new Cube()
    this.whitePlayer = whitePlayer
    this.blackPlayer = blackPlayer
    this.whitePlayer.dice = [new Die('white'), new Die('white')]
    this.blackPlayer.dice = [new Die('black'), new Die('black')]
    const [seQuadrant, swQuadrant, nwQuadrant, neQuadrant] = this.buildQuadrants()
    this.board = new Board([neQuadrant, nwQuadrant, swQuadrant, seQuadrant], this.rail)
    this.initializeCheckers()
  }

  initializeCheckers(): void {
    const allPoints =
      this.board.quadrants[0].points.concat(
        this.board.quadrants[1].points,
        this.board.quadrants[2].points,
        this.board.quadrants[3].points
      )

    for (let i = 0; i < CHECKERS_PER_PLAYER; i++) {
      this.whitePlayer.addChecker(new Checker('white'))
      this.blackPlayer.addChecker(new Checker('black'))
    }

    // TODO: Barf switch to use InitBoardSetup
    console.log(InitBoardSetup)
    if (this.whitePlayer.checkers && this.whitePlayer.checkers.length === CHECKERS_PER_PLAYER) {
      const twentyFourPoint = allPoints.filter(p => p.position === 24)[0]
      const thirteenPoint = allPoints.filter(p => p.position === 13)[0]
      const eightPoint = allPoints.filter(p => p.position === 8)[0]
      const sixPoint = allPoints.filter(p => p.position === 6)[0]
      twentyFourPoint.addCheckers(this.whitePlayer.checkers.slice(0, 2))
      thirteenPoint.addCheckers(this.whitePlayer.checkers.slice(2, 7))
      eightPoint.addCheckers(this.whitePlayer.checkers.slice(7, 10))
      sixPoint.addCheckers(this.whitePlayer.checkers.slice(-5))
    }

    if (this.blackPlayer.checkers && this.blackPlayer.checkers.length === CHECKERS_PER_PLAYER) {
      const onePoint = allPoints.filter(p => p.position === 1)[0]
      const twelvePoint = allPoints.filter(p => p.position === 12)[0]
      const seventeenPoint = allPoints.filter(p => p.position === 17)[0]
      const nineteenPoint = allPoints.filter(p => p.position === 19)[0]
      onePoint.addCheckers(this.blackPlayer.checkers.slice(0, 2))
      twelvePoint.addCheckers(this.blackPlayer.checkers.slice(2, 7))
      seventeenPoint.addCheckers(this.blackPlayer.checkers.slice(7, 10))
      nineteenPoint.addCheckers(this.blackPlayer.checkers.slice(-5))
    }

  }

  createCheckers(color: Color, point: Point, num: number): void {
    for (let i = 0; i < num; i++) {
      const c = new Checker(color, point)
      console.log(c)

    }
  }

  buildQuadrants(): Quadrant[] {
    const points: Point[] = []
    for (let i = 0; i < NUMBER_POINTS; i++) {
      points.push(new Point(i + 1))
    }
    const sePoints = points.filter(
      p => p.position <= 6
    )
    const nePoints = points.filter(
      p => p.position >= 19
    )
    const nwPoints = points.filter(p =>
      p.position >= 13 && p.position <= 18
    )
    const swPoints = points.filter(p =>
      p.position >= 7 && p.position <= 12
    )

    const seQuadrant = new Quadrant('se', sePoints)
    const swQuadrant = new Quadrant('sw', swPoints)
    const neQuadrant = new Quadrant('ne', nePoints)
    const nwQuadrant = new Quadrant('nw', nwPoints)



    return [seQuadrant, swQuadrant, nwQuadrant, neQuadrant]
  }




}

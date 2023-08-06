import { MoveDirection, Game, Die, Color, CheckerBox, Checker, DieValue, modelDebug, isPoint, isRail, isOff, generateId } from '.'
import { MoveAction } from './Move'

export class Player {
  id: string
  firstName: string
  lastName: string
  color: Color
  moveDirection: MoveDirection
  active: boolean = false
  dice?: [Die, Die]
  currentGame?: Game
  nickName?: string
  checkers?: Checker[] = []

  constructor ({ firstName, lastName, color, nickName, checkers }: { firstName: string; lastName: string; color: Color; nickName?: string | undefined; checkers?: Checker[] }) {
    this.id = generateId()
    this.firstName = firstName
    this.lastName = lastName
    this.color = color
    this.nickName = nickName || firstName
    this.checkers = checkers || []
    this.moveDirection = color === 'white' ? 'clockwise' : 'counterclockwise'
  }

  static rollForStart (): DieValue {
    return Die.roll()
  }

  static roll (): DieValue[] {
    return [Die.roll() as DieValue, Die.roll() as DieValue]
  }

  static move (action: MoveAction, checkerboxes: CheckerBox[]): CheckerBox[] {
    // let draft: CheckerBox[] = checkerboxes
    return checkerboxes
  }

  // move ({ origin, destination, roll }: { origin: Point | Rail; destination: Point | Off; roll: DieValue[] }): { origin: Point | Rail; destination: Point | Off } {



  //   let isHit: boolean = false
  //   if (modelDebug) {
  //     console.log(`[Player Model] move ${this.color}:`)
  //     console.log(`[Player Model] active?: ${this.active.toString()}`)
  //     console.log(`[Player Model] move origin:`, origin)
  //     console.log(`[Player Model] move destination:`, destination)
  //     console.log(`[Player Model] move roll:`, roll)
  //   }
  //   if (!this.active) {
  //     throw new GameError({ model: 'Player', errorMessage: 'It is not your turn!' })
  //   }

  //   if (origin.checkers.length === 0) {
  //     throw new GameError({ model: 'Player', errorMessage: `There are no checkers to move in ${origin.id}` })
  //   }

  //   if (origin.checkers[0].color !== this.color) {
  //     throw new GameError({ model: 'Player', errorMessage: 'That is not your checker' })
  //   }

  //   if (!this.active) {
  //     throw new GameError({ model: 'Player', errorMessage: `${this.color} is not active and cannot move` })
  //   }

  //   // if (isPoint(origin) && isPoint(destination)) {

  //   // }


  //   // if (destination.checkers) {
  //   //   console.error('There are other checkers on this point')
  //   //   if (destination.checkers.length === 1 && destination.checkers[0].color !== this.color) {
  //   //     isHit = true
  //   //     console.log(isHit)
  //   //     const hitChecker = destination.checkers[0]
  //   //     console.log(hitChecker)
  //   //     if (!this.currentGame) {
  //   //       throw new GameError({ model: 'Player', errorMessage: 'No current game' })
  //   //     }
  //   //     const railCheckerBox = this.currentGame.board.rail.checkerboxes[this.color]
  //   //     destination.checkers = []
  //   //     railCheckerBox.checkers.push(hitChecker)
  //   //   }
  //   // }



  //   // const moveDelta = Math.abs(origin.position - destination.position)

  //   // if (moveDelta !== roll[0] && moveDelta !== roll[1] && moveDelta !== roll[0] + roll[1]) {
  //   //   throw new GameError({ model: 'Player', errorMessage: `Illegal move for roll: ${roll[0]} ${roll[1]}` })
  //   // }

  //   // if (this.moveDirection === 'clockwise') {
  //   //   if (origin.position < destination.position) {
  //   //     throw new GameError({ model: 'Player', errorMessage: `${this.color} can only move ${this.moveDirection.toString()}` })
  //   //   }
  //   // } else {
  //   //   if (origin.position > destination.position) {
  //   //     throw new GameError({ model: 'Player', errorMessage: `${this.color} can only move ${this.moveDirection}` })
  //   //   }
  //   // }

  //   // const checkerToMove = origin.checkers[origin.checkers.length - 1]
  //   // if (!checkerToMove) {
  //   //   throw new GameError({ model: 'Player', errorMessage: 'No checker to move' })
  //   // }
  //   // if (checkerToMove.color !== this.color) {
  //   //   throw new GameError({ model: 'Player', errorMessage: `${this.color} cannot move ${checkerToMove.color} checkers` })
  //   // }

  //   // if (modelDebug) {
  //   //   console.log(`[Player Model] origin: `, origin)
  //   //   console.log(`[Player Model] destination:`, destination)

  //   // }

  //   // const newOriginCheckers = origin.checkers.slice(0, origin.checkers.length - 1)
  //   // const newDestinationCheckers = destination.checkers.concat(checkerToMove)

  //   // const newOrigin: CheckerBox = {
  //   //   ...origin,
  //   //   checkers: newOriginCheckers
  //   // }

  //   // const newDestination: CheckerBox = {
  //   //   ...destination,
  //   //   checkers: newDestinationCheckers
  //   // }

  //   // return { origin: newOrigin, destination: newDestination }
  // }


}


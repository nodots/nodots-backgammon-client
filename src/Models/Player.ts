import { Color, INIT_PIP_COUNT, generateId } from './Backgammon'
import { Checker } from './Checker'
import { Die } from './Die'
import { Point } from './Point'

export class Player {
  id: string
  firstName: string
  lastName: string
  color: Color
  nickName?: string
  checkers?: Checker[] = []
  dice?: Die[]

  constructor (firstName: string, lastName: string, color: Color, nickName?: string | undefined, checkers?: Checker[], dice?: Die[]) {
    this.id = generateId()
    this.firstName = firstName
    this.lastName = lastName
    this.color = color
    this.dice = [new Die(color), new Die(color)]
    this.nickName = nickName || firstName
    this.checkers = checkers || []
  }

  // roll (): [number, number] {
  //   // if (!this.dice || this.dice.length !== 2) {
  //   //   throw Error('No dice to roll')
  //   // }
  //   // return [this.dice[0].roll(), this.dice[1].roll()]
  // }

  // // TODO: Implement. Investigate making 'move' a method in Game that's pushed down to Player as a prop.
  // move (checker: Checker, destination: Point): void {
  //   this.findCheckers()
  // }

  // // TODO: Implement. This might also need to be lifted up to the Game level
  // getPipCount (): number {
  //   const pipCount = INIT_PIP_COUNT
  //   console.log(`${this.color} PIP count: ${pipCount.toString()}`)
  //   return pipCount
  // }

  private findCheckers (): void {
    console.log(this.checkers)
  }


}

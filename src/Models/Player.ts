import { Color, generateId } from './Backgammon'
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

  // TODO: Implement. Investigate making 'move' a method in Game that's pushed down to Player as a prop.
  move (checker: Checker, destination: Point) {
    this.findCheckers()
  }

  private findCheckers (): void {
    console.log(this.checkers)
  }


}

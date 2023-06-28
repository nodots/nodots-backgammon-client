import { Color, DieValue, generateId } from './Backgammon'
import { Checker } from './Checker'
import { Die } from './Die'

export class Player {
  id: string
  firstName: string
  lastName: string
  color: Color
  nickName?: string
  checkers?: Checker[] = []
  dice?: Die[]
  active: boolean = false

  constructor (firstName: string, lastName: string, color: Color, nickName?: string | undefined, checkers?: Checker[], dice?: Die[]) {
    this.id = generateId()
    this.firstName = firstName
    this.lastName = lastName
    this.color = color
    this.dice = [new Die(color), new Die(color)]
    this.nickName = nickName || firstName
    this.checkers = checkers || []
  }

  roll (): [DieValue, DieValue] {
    if (!this.dice || this.dice.length !== 2) {
      throw Error('No dice to roll')
    }
    return [this.dice[0].roll() as DieValue, this.dice[1].roll() as DieValue]
  }
}


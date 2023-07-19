import { Color, DieValue, generateId } from '.'
import { Checker } from './Checker'
import { Die } from './Die'
import { GameAction, GAME_ACTION_TYPE } from '../State'

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

  move (): void {
    const action = { type: GAME_ACTION_TYPE.MOVE, payload: {} }
    console.log(`[PLAYER MODEL] move:`)
    console.log(action)
  }

  rollForStart (): DieValue {
    const action = { type: GAME_ACTION_TYPE.ROLL_FOR_START, payload: {} }
    if (!this.dice || this.dice.length !== 2) {
      throw Error(`${this.color.toString()} has no dice`)
    }
    return this.dice[0].roll()

  }
}


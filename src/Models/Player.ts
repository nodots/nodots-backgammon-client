import { Color, CheckerBox, Checker, DieValue, Die, modelDebug, generateId } from '.'

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

  move (origin: CheckerBox, destination: CheckerBox, roll: [DieValue, DieValue]): { origin: CheckerBox, destination: CheckerBox } {
    if (!modelDebug) {
      console.log(`[PLAYER MODEL] move:`)
      if (origin.checkers.length === 0) {
        throw Error(`There are no checkers to move in ${origin.id}`)
      }
    }
    const checkerToMove = origin.checkers[origin.checkers.length - 1]
    if (!checkerToMove) {
      throw Error(`Failed to find checker to move`)
    }
    const newOriginCheckers = origin.checkers.slice(0, origin.checkers.length - 1)
    const newDestinationCheckers = destination.checkers.concat(checkerToMove)

    const newOrigin: CheckerBox = {
      ...origin,
      checkers: newOriginCheckers
    }

    const newDestination: CheckerBox = {
      ...destination,
      checkers: newDestinationCheckers
    }

    return { origin: newOrigin, destination: newDestination }
  }

  rollForStart (): DieValue {
    if (!this.dice || this.dice.length !== 2) {
      throw Error(`${this.color.toString()} has no dice`)
    }
    return this.dice[0].roll()

  }
}


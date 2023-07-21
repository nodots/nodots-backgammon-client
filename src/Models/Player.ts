import { Point, Color, CheckerBox, Checker, DieValue, Die, modelDebug, generateId } from '.'

export type MoveDirection = 'clockwise' | 'counterclockwise'

export class Player {
  id: string
  firstName: string
  lastName: string
  color: Color
  moveDirection: MoveDirection
  nickName?: string
  checkers?: Checker[] = []
  dice?: Die[]
  active: boolean = false

  constructor ({ firstName, lastName, color, nickName, checkers, dice }: { firstName: string; lastName: string; color: Color; nickName?: string | undefined; checkers?: Checker[]; dice?: Die[] }) {
    this.id = generateId()
    this.firstName = firstName
    this.lastName = lastName
    this.color = color
    this.dice = [new Die({ color }), new Die({ color })]
    this.nickName = nickName || firstName
    this.checkers = checkers || []
    this.moveDirection = color === 'white' ? 'clockwise' : 'counterclockwise'
  }

  roll (): [DieValue, DieValue] {
    if (!this.dice || this.dice.length !== 2) {
      throw Error('No dice to roll')
    }
    return [this.dice[0].roll() as DieValue, this.dice[1].roll() as DieValue]
  }

  move (origin: CheckerBox, destination: CheckerBox, roll: [DieValue, DieValue]): { origin: CheckerBox, destination: CheckerBox } {
    if (modelDebug) {
      console.log(`[PLAYER MODEL] move ${this.color}:`)
      console.log(`[PLAYER MODEL] active?: ${this.active.toString()}`)
    }
    if (origin.checkers.length === 0) {
      throw Error(`There are no checkers to move in ${origin.id}`)
    }

    if (!this.active) {
      throw Error(`${this.color} is not active and cannot move`)
    }
    if (origin.type !== 'point' || destination.type !== 'point') {
      throw Error(`Only moves between Points are supported currently`)
    }

    const originPoint = origin.parent as Point
    const destinationPoint = destination.parent as Point

    if (!originPoint || !destinationPoint || !originPoint.checkerBox.parent) {
      throw Error(`Missing parent Point for checkerBox`)
    }

    console.log(`this.moveDirection = ${this.moveDirection.toString()}`)
    console.log(`originPoint.position = ${originPoint.position}`)
    console.log(`destinationPoint.position = ${destinationPoint.position}`)

    const moveDelta = Math.abs(originPoint.position - destinationPoint.position)

    if (moveDelta !== roll[0] && moveDelta !== roll[1] && moveDelta !== roll[0] + roll[1]) {
      throw Error(`Illegal move for roll: ${roll[0]} ${roll[1]}`)
    }

    if (this.moveDirection === 'clockwise') {
      if (originPoint.position < destinationPoint.position) {
        throw Error(`${this.color} can only move ${this.moveDirection.toString()}`)
      }
    } else {
      if (originPoint.position > destinationPoint.position) {
        throw Error(`${this.color} can only move ${this.moveDirection}`)
      }
    }

    const checkerToMove = origin.checkers[origin.checkers.length - 1]
    if (!checkerToMove) {
      throw Error(`Failed to find checker to move`)
    }
    if (checkerToMove.color !== this.color) {
      throw Error(`${this.color} cannot move ${checkerToMove.color} checkers`)
    }



    if (this.moveDirection === 'clockwise') {

    }

    if (modelDebug) {
      console.log(`[PLAYER MODEL] origin:`)
      console.log(origin)
      console.log(`[PLAYER MODEL] destination:`)
      console.log(destination)
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


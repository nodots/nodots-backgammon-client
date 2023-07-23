import { MoveDirection, Point, Color, GameError, CheckerBox, Checker, DieValue, Die, modelDebug, generateId } from '.'

export class Player {
  id: string
  firstName: string
  lastName: string
  color: Color
  moveDirection: MoveDirection
  nickName?: string
  checkers?: Checker[] = []
  active: boolean = false

  constructor ({ firstName, lastName, color, nickName, checkers, dice }: { firstName: string; lastName: string; color: Color; nickName?: string | undefined; checkers?: Checker[]; dice?: Die[] }) {
    this.id = generateId()
    this.firstName = firstName
    this.lastName = lastName
    this.color = color
    this.nickName = nickName || firstName
    this.checkers = checkers || []
    this.moveDirection = color === 'white' ? 'clockwise' : 'counterclockwise'
  }

  static roll (): [DieValue, DieValue] {
    return [Die.roll() as DieValue, Die.roll() as DieValue]
  }

  move ({ origin, destination, roll }: { origin: CheckerBox; destination: CheckerBox; roll: [DieValue, DieValue] }): { origin: CheckerBox, destination: CheckerBox } {
    if (modelDebug) {
      console.log(`[Player Model] move ${this.color}:`)
      console.log(`[Player Model] active?: ${this.active.toString()}`)
      console.log(`[Player Model] move origin:`, origin)
      console.log(`[Player Model] move destination:`, destination)
      console.log(`[Player Model] move roll:`, roll)
    }
    if (!this.active) {
      throw new GameError({ model: 'Player', errorMessage: 'It is not your turn!' })
    }

    if (origin.checkers.length === 0) {
      throw new GameError({ model: 'Player', errorMessage: `There are no checkers to move in ${origin.id}` })
    }



    if (origin.checkers[0].color !== this.color) {
      throw new GameError({ model: 'Player', errorMessage: 'That is not your checker' })
    }

    if (!this.active) {
      throw new GameError({ model: 'Player', errorMessage: `${this.color} is not active and cannot move` })
    }
    if (origin.type !== 'point' || destination.type !== 'point') {
      throw new GameError({ model: 'Player', errorMessage: `Only moves between Points are supported currently` })
    }

    const originPoint = origin.parent as Point
    const destinationPoint = destination.parent as Point

    if (!originPoint || !destinationPoint || !originPoint.checkerBox.parent) {
      throw new GameError({ model: 'Player', errorMessage: 'Missing parent Point for checkerBox' })
    }

    console.log(`this.moveDirection = ${this.moveDirection.toString()}`)
    console.log(`originPoint.position = ${originPoint.position}`)
    console.log(`destinationPoint.position = ${destinationPoint.position}`)

    const moveDelta = Math.abs(originPoint.position - destinationPoint.position)

    if (moveDelta !== roll[0] && moveDelta !== roll[1] && moveDelta !== roll[0] + roll[1]) {
      throw new GameError({ model: 'Player', errorMessage: `Illegal move for roll: ${roll[0]} ${roll[1]}` })
    }

    if (this.moveDirection === 'clockwise') {
      if (originPoint.position < destinationPoint.position) {
        throw new GameError({ model: 'Player', errorMessage: `${this.color} can only move ${this.moveDirection.toString()}` })
      }
    } else {
      if (originPoint.position > destinationPoint.position) {
        throw new GameError({ model: 'Player', errorMessage: `${this.color} can only move ${this.moveDirection}` })
      }
    }

    const checkerToMove = origin.checkers[origin.checkers.length - 1]
    if (!checkerToMove) {
      throw new GameError({ model: 'Player', errorMessage: 'No checker to move' })
    }
    if (checkerToMove.color !== this.color) {
      throw new GameError({ model: 'Player', errorMessage: `${this.color} cannot move ${checkerToMove.color} checkers` })
    }

    if (modelDebug) {
      console.log(`[Player Model]origin: `)
      console.log(origin)
      console.log(`[Player Model]destination: `)
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
    return Die.roll()

  }
}


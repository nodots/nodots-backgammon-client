import { Checker } from './Checker'
import { generateId } from './Backgammon'

export class Point {
  id: string
  position: number
  currentCheckers?: Checker[]

  constructor(position: number, currentCheckers?: Checker[]) {
    this.id = generateId()
    this.position = position
    this.currentCheckers = currentCheckers ? currentCheckers : []
  }

  addCheckers(checkers: Checker[]) {
    this.currentCheckers?.push(...checkers)
  }

}

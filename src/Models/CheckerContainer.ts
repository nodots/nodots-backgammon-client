import { Color, generateId } from './Backgammon'
import { Checker } from './Checker'

export type CheckerContainerType = 'point' | 'rail' | 'off'

export class CheckerContainer {
  id: string
  type: CheckerContainerType
  color: Color | undefined
  checkers: Checker[]

  constructor (type: CheckerContainerType, color?: Color, checkers?: Checker[]) {
    this.id = generateId()
    this.type = type
    color ? this.color = color : this.color = undefined
    checkers ? this.checkers = checkers : this.checkers = []
  }
}
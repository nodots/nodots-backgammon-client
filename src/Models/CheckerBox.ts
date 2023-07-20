import { Color, generateId } from '.'
import { Checker } from './Checker'

export type CheckerBoxType = 'point' | 'rail' | 'off'

export class CheckerBox {
  id: string
  type: CheckerBoxType
  color: Color | undefined
  checkers: Checker[]

  constructor (type: CheckerBoxType, color?: Color, checkers?: Checker[]) {
    this.id = generateId()
    this.type = type
    color ? this.color = color : this.color = undefined
    checkers ? this.checkers = checkers : this.checkers = []
  }

}
import { Color, CheckerBoxType, generateId } from '.'
import { GameError } from './Error'
import { Checker } from './Checker'
import { Point } from './Point'
import { Off } from './Off'
import { Rail } from './Rail'

export class CheckerBox {
  id: string
  type: CheckerBoxType
  color: Color | undefined
  checkers: Checker[]
  parent?: Point | Rail | Off

  constructor ({ type, parent, color, checkers }: { type: CheckerBoxType; parent: Point | Rail | Off, color?: Color; checkers?: Checker[] }) {
    this.id = generateId()
    this.type = type

    this.color = color ? color : undefined
    this.checkers = checkers ? checkers : []
    switch (this.type) {
      case 'point':
        this.parent = parent as Point
        break
      case 'rail':
        this.parent = parent as Rail
        break
      case 'off':
        this.parent = parent as Off
        break
      default:
        throw new GameError({ model: 'CheckerBox', errorMessage: 'Unknown type' })
    }
  }
}
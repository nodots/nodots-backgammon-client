import { DieValue, generateId } from '.'
import { Checker } from './Checker'
import { CheckerBox } from './CheckerBox'
import { Player } from './Player'

export enum MoveMode {
  POINT_TO_POINT,
  HIT,
  REENTER,
  OFF
}

export enum MoveStatus {
  INITIALIZED,
  ORIGIN_SET,
  DESTINATION_SET,
  COMPLETED,
  ERROR
}

export interface MoveAction {
  origin: CheckerBox
  destination: CheckerBox
}

export class Move {
  id: string
  dieValue: DieValue
  mode: MoveMode | undefined
  checker: Checker | undefined
  origin: CheckerBox | undefined
  destination: CheckerBox | undefined
  status: MoveStatus | undefined

  constructor (dieValue: DieValue) {
    this.id = generateId()
    this.dieValue = dieValue
  }



}


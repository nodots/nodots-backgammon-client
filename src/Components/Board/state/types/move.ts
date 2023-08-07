import { Checker } from '../../../Checker/state/types'
import { CheckerBox } from '../../../CheckerBox/state/types'
import { DieValue } from '../../../Die/state/types'
import { Player } from '../../../Player/state/types'

export enum MoveMode {
  POINT_TO_POINT,
  HIT,
  REENTER,
  OFF,
}

export enum MoveStatus {
  INITIALIZED,
  ORIGIN_SET,
  DESTINATION_SET,
  COMPLETED,
  ERROR,
}

/* 
Players make moves by putting checkers in different checkerboxes
then notifies the board with a MoveAction
*/
export interface MoveAction {
  player: Player
  state: CheckerBox[]
  origin: CheckerBox
  destination: CheckerBox
}

export type Move = {
  id: string
  dieValue: DieValue
  status: MoveStatus
  mode?: MoveMode
  checker?: Checker
  origin?: CheckerBox
  destination?: CheckerBox
}

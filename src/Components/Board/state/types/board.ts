// import { Color } from '../../../../models'
// import { CheckerBox } from '../../../CheckerBox/state/types'
import { OffContainer, initialize as initializeOff } from '../../../Off/state/types'
import { RailContainer, initialize as initializeRail } from '../../../Rail/state/types'
import { Quadrant, initialize as initializeQuadrants } from '../../../Quadrant/state/types'
import { MoveAction } from '../../../CheckerBox/state/types/move'
import DEFAULT_SETUP from '../config/DEFAULT.json'
import { CheckerBoxPosition } from '../../../../game'

export const POINT_COUNT = 24
// For importing setup
export interface CheckerProp {
  color: string,
  checkerCount: number,
  position: CheckerBoxPosition
}


export enum BOARD_ACTION_TYPE {
  MOVE_CHECKER
}

export type Board = {
  quadrants: Quadrant[]
  off: OffContainer
  rail: RailContainer
  moveChecker?: (action: MoveAction) => void
}

export const initialize = (): Board => {
  const board: Board = {
    quadrants: initializeQuadrants(DEFAULT_SETUP),
    off: initializeOff(DEFAULT_SETUP),
    rail: initializeRail(DEFAULT_SETUP),

  }
  return board
}


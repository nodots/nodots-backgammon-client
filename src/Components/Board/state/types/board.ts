import { Color } from '../../../../game'
// import { CheckerBox } from '../../../CheckerBox/state/types'
import { Checker } from '../../../Checker/state'
import { OffContainer, initialize as initializeOff } from '../../../Off/state/types'
import { RailContainer, initialize as initializeRail } from '../../../Rail/state/types'
import { Quadrant, initialize as initializeQuadrants } from '../../../Quadrant/state/types'
import { MoveAction } from '../../../../game/move'
import DEFAULT_SETUP from '../config/OFF.json'
import { CheckerBoxPosition } from '../../../../game'
import { check } from 'prettier'

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

/*
All of a players checkers must be in his home board or off in order to move
a checker to off

*/
// FIXME: Assumes that players always move in direction automatically assigned for color
export const isOffEligible = (board: Board, color: Color): boolean => {
  let homeQuadrant: Quadrant | undefined
  const off = board.off[color]
  if (color === 'white') {
    homeQuadrant = board.quadrants[0]
  } else {
    homeQuadrant = board.quadrants[3]
  }

  const offCheckers = off.checkers
  let checkerCount = offCheckers.length
  homeQuadrant.points.forEach(p => {
    p.checkers.forEach(c => {
      if (c.color === color) {
        checkerCount++
      }
    })
  })
  return checkerCount === 15 ? true : false
}


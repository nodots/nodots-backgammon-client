import { CheckerBox } from '../../../CheckerBox/state/types'
import { OffContainer, initialize as initializeOff } from '../../../Off/state/types'
import { RailContainer, initialize as initializeRail } from '../../../Rail/state/types'
import { Quadrant, initialize as initializeQuadrants } from '../../../Quadrant/state/types'
import DEFAULT_SETUP from '../config/OFF.json'

export const POINT_COUNT = 24
// For importing setup
export interface CheckerProp {
  color: string,
  checkerCount: number,
  position: any
}

export enum BOARD_ACTION_TYPE {
  MOVE_CHECKER
}

export type Board = {
  quadrants: Quadrant[]
  off: OffContainer
  rail: RailContainer
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
// export const isOffEligible = (board: Board, color: Color): boolean => {
//   let homeQuadrant: Quadrant | undefined
//   const off = board.off[color]
//   if (color === 'white') {
//     homeQuadrant = board.quadrants[0]
//   } else {
//     homeQuadrant = board.quadrants[3]
//   }

//   const offCheckers = off.checkers
//   let checkerCount = offCheckers.length
//   homeQuadrant.points.forEach(p => {
//     p.checkers.forEach(c => {
//       if (c.color === color) {
//         checkerCount++
//       }
//     })
//   })
//   return checkerCount === CHECKERS_PER_PLAYER ? true : false
// }

export const getCheckerBoxes = (board: Board): CheckerBox[] => {
  const checkerBoxes: CheckerBox[] = []
  board.quadrants.forEach(q => {
    checkerBoxes.push(...q.points)
  })
  checkerBoxes.push(board.off.white)
  checkerBoxes.push(board.off.black)
  checkerBoxes.push(board.rail.white)
  checkerBoxes.push(board.rail.black)
  return checkerBoxes
}

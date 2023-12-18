import { initBoardState } from './board.state'

import {
  POINT_COUNT,
  Board,
  getCheckerboxes,
  sanityCheckBoard,
  getCheckerboxCoordinates,
  getPipCountForPlayer,
  isBoard,
} from './types'

import { MoveMode } from '../../../game/move'

export {
  initBoardState,
  POINT_COUNT,
  getCheckerboxes,
  sanityCheckBoard,
  getCheckerboxCoordinates,
  getPipCountForPlayer,
  MoveMode,
  isBoard,
}

export type { Board }

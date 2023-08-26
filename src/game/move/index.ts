import { GameError } from '../game'
import { getCheckerBoxes, isBoard } from '../../components/Board/state/types/board'
import { Board, } from '../../components/Board/state'
import { QuadrantLocation } from '../../components/Quadrant/state/types'
import { Checker, isChecker } from '../../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../../components/CheckerBox/state/types'
import { DieValue } from '../../components/Die/state'
import { Player, isPlayer } from '../../components/Player/state'
import { GAME_ACTION_TYPE } from '../game.reducer'
import { pointToPoint } from './point-to-point'
import { hit } from './hit'
import { reenter } from './reenter'
import { off } from './off'
import { revert } from './revert'

export enum MoveMode {
  POINT_TO_POINT,
  POINT_TO_POINT_HIT,
  REENTER,
  REENTER_HIT,
  BEAR_OFF,
  NO_MOVE,
  REVERT,
  ERROR
}

export enum MoveStatus {
  INITIALIZED,
  REVERTED,
  COMPLETED,
  NO_MOVE,
  ERROR,
}

/* 
Players make moves by putting checkers in different checkerboxes
then notifies the board with a MoveAction
*/
export interface MoveActionPayload {
  player: Player,
  checkerbox: CheckerBox
}

export interface MoveAction {
  type: GAME_ACTION_TYPE,
  payload: MoveActionPayload
}

export type Move = {
  id: string
  dieValue: DieValue
  status: MoveStatus
  mode?: MoveMode
  checker?: Checker
  origin?: CheckerBox
  destination?: CheckerBox
  hit?: {
    checker: Checker
    checkerbox: CheckerBox
  }
}

export const isMove = (m: any): m is Move => {
  console.warn('[TRACEMOVE] isMove move', m)
  if (typeof m !== 'object') {
    console.warn('[TRACEMOVE] isMove move is not an object')
    return false
  }

  const keys = Object.keys(m)

  const idIndex = keys.findIndex(k => k === 'id')
  if (idIndex === -1) {
    console.warn('[TRACEMOVE] isMove move has no id')
    return false
  }

  const dieValueIndex = keys.findIndex(k => k === 'dieValue')
  if (dieValueIndex === -1) {
    console.warn('[TRACEMOVE] isMove move has no dieValue')
    return false
  }
  const statusIndex = keys.findIndex(k => k === 'status')
  if (statusIndex === -1) {
    console.warn('[TRACEMOVE] isMove move has no status')
    return false
  }

  return true
}

export function getCheckerboxCoordinates (board: Board, id: string | undefined) {
  let quadrantIndex: number | undefined = undefined
  let pointIndex: number | undefined = undefined
  const checkerbox = getCheckerBoxes(board).find(cb => cb.id === id)

  if (checkerbox) {
    if (typeof checkerbox.position === 'number') {
      if (checkerbox.position <= 6) {
        quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SE)
      } else if (checkerbox.position >= 7 && checkerbox.position <= 12) {
        quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.SW)
      } else if (checkerbox.position >= 13 && checkerbox.position <= 18) {
        quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NW)
      } else if (checkerbox.position >= 19 && checkerbox.position <= 24) {
        quadrantIndex = board.quadrants.findIndex(q => q.location === QuadrantLocation.NE)
      } else {
        throw new GameError({ model: 'Move', errorMessage: 'No quadrant' })
      }

      if (typeof quadrantIndex !== 'number' ||
        quadrantIndex < 0 ||
        quadrantIndex > 3) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No Quadrant Index'
        })

      }
      pointIndex = board.quadrants[quadrantIndex].points.findIndex(p => p.id === id)
    } else {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No Quadrant'
      })
    }
    return { quadrantIndex, pointIndex }

  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No checkerbox'
    })
  }
}

export const isCheckerInTurn = (origin: CheckerBox, moves: Move[]): boolean => {
  let inTurn: boolean = false
  console.log('[Revert] moves', moves)
  const ctm = origin.checkers[origin.checkers.length - 1]
  if (moves.length > 0 && moves.find(m => m.checker?.id !== undefined && m.checker.id === ctm.id)) {
    inTurn = true
  }
  return inTurn
}


// export const getMoveMode = (board: Board, origin: CheckerBox, destination: CheckerBox, activeColor: Color, activePlayer: Player, dieValue: DieValue): MoveMode => {

//   if (board.rail[activeColor].checkers.length > 0) {
//     return MoveMode.REENTER
//   }
//   if (origin.position === 'off') {
//     throw new GameError({ model: 'Move', errorMessage: 'Cannot move from off' })
//   }
//   if (destination.position === 'rail') {
//     throw new GameError({ model: 'Move', errorMessage: 'Cannot move to rail' })
//   }
//   if (typeof origin.position === 'number' && typeof destination.position === 'number') {
//     if (!activePlayer || !activePlayer.active) {
//       throw new GameError({ model: 'Move', errorMessage: 'No active player' })
//     }
//     if (destination.checkers && destination.checkers.length > 1 && destination.checkers[0].color !== activeColor) {
//       throw new GameError({ model: 'Move', errorMessage: 'Destination is owned by opponent' })
//     }

//     if (destination.position === origin.position) {
//       throw new GameError({ model: 'Move', errorMessage: 'Origin and destination cannot be the same' })
//     }
//     if (activePlayer.moveDirection === 'clockwise' && destination.position < origin.position) {
//       // throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
//       // console.error('Player moves clockwise')
//       return MoveMode.ERROR
//     }
//     if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
//       throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
//     }
//     if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
//       return MoveMode.HIT
//     } else {
//       return MoveMode.POINT_TO_POINT
//     }
//   } else if (typeof origin.position === 'number' && destination.position === 'off') {
//     return MoveMode.BEAR_OFF
//   } else if (origin.position === 'rail' && typeof destination.position === 'number') {
//     return MoveMode.REENTER
//   } else {
//     throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
//   }
// }

export {
  pointToPoint,
  reenter,
  revert,
  hit,
  off
}
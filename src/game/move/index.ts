import { Color } from '..'
import { GameError } from '../game'
import { getCheckerBoxes } from '../../components/Board/state/types/board'
import { Board, } from '../../components/Board/state'
import { QuadrantLocation } from '../../components/Quadrant/state/types'
import { Checker } from '../../components/Checker/state'
import { CheckerBox } from '../../components/CheckerBox/state/types'
import { DieValue } from '../../components/Die/state'
import { Player } from '../../components/Player/state'
import { GAME_ACTION_TYPE } from '../game.reducer'
import { pointToPoint } from './pointToPoint'
import { hit } from './hit'
import { reenter } from './reenter'
import { off } from './off'

export enum MoveMode {
  POINT_TO_POINT,
  HIT,
  REENTER,
  NO_MOVE,
  BEAR_OFF,
  ERROR
}

export enum MoveStatus {
  INITIALIZED,
  ORIGIN_SET,
  DESTINATION_SET,
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

export const getMoveMode = (board: Board, origin: CheckerBox, destination: CheckerBox, activeColor: Color, activePlayer: Player, dieValue: DieValue): MoveMode => {
  if (board.off[activeColor].checkers.length > 0) {
    return MoveMode.REENTER
  }
  if (origin.position === 'off') {
    throw new GameError({ model: 'Move', errorMessage: 'Cannot move from off' })
  }
  if (destination.position === 'rail') {
    throw new GameError({ model: 'Move', errorMessage: 'Cannot move to rail' })
  }
  if (typeof origin.position === 'number' && typeof destination.position === 'number') {
    if (!activePlayer || !activePlayer.active) {
      throw new GameError({ model: 'Move', errorMessage: 'No active player' })
    }
    if (destination.checkers && destination.checkers.length > 1 && destination.checkers[0].color !== activeColor) {
      throw new GameError({ model: 'Move', errorMessage: 'Destination is owned by opponent' })
    }
    if (destination.position === origin.position) {
      throw new GameError({ model: 'Move', errorMessage: 'Origin and destination cannot be the same' })
    }
    if (activePlayer.moveDirection === 'clockwise' && destination.position < origin.position) {
      // throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
      // console.error('Player moves clockwise')
      return MoveMode.ERROR
    }
    if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
      throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
    }
    if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
      return MoveMode.HIT
    } else {
      return MoveMode.POINT_TO_POINT
    }
  } else if (typeof origin.position === 'number' && destination.position === 'off') {
    return MoveMode.BEAR_OFF
  } else if (origin.position === 'rail' && typeof destination.position === 'number') {
    return MoveMode.REENTER
  } else {
    throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
  }
}

export {
  pointToPoint,
  reenter,
  hit,
  off
}
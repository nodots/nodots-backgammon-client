import { produce } from 'immer'
import { Color } from '.'
import { GameError } from './game'
import { Board } from '../components/Board/state'
import { QuadrantLocation } from '../components/Quadrant/state/types'
import { Checker } from '../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../components/CheckerBox/state/types'
import { DieValue } from '../components/Die/state'
import { Player } from '../components/Player/state'

import { GAME_ACTION_TYPE } from './game.reducer'
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

// export const reducer = (state: Turn, action: MoveAction): Turn => {
//   // TKTK
// }


// Start move methods
export const pointToPoint = (board: Board, move: Move): Board => {
  if (!move.origin || !move.destination) {
    throw new GameError({ model: 'Move', errorMessage: 'Missing origin or destination' })
  }

  // FIXME: Check for mismatch of die value and move
  if (Math.abs((move.origin.position as number) - (move.destination.position as number)) !== (move.dieValue as number)) {
    throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
  }
  return produce(board, draft => {
    let checkerToMove: Checker | undefined = undefined
    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)
    const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)
    console.log(originInfo)
    if (originInfo.quadrantIndex !== -1 && originInfo.pointIndex !== -1) {
      checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[0]
      if (!checkerToMove) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checker to move'
        })
      } else {
        // FIXME typeguard
        let ctm: Checker = checkerToMove as Checker
        const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
        const newOrigin = produce(oldOrigin, draft => {
          draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
        })
        const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number]
        const newDestination = produce(oldDestination, draft => {
          draft.checkers.push(ctm)
        })
        return produce(board, draft => {
          draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
          draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
        })
      }
    } else {
      throw Error('No origin')
    }
  })
}

export const off = (board: Board, move: Move): Board => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }
  const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)

  return produce(board, draft => {
    // FIXME: Typeguard
    const checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[0] as Checker
    draft.off[checkerToMove.color].checkers.push(checkerToMove)
  })
}

export const hit = (board: Board, move: Move): Board => {
  console.log(board)
  console.log(move)

  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }


  const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)

  // FIXME: Write propper typeguard
  if (typeof originInfo.quadrantIndex !== 'number' || typeof originInfo.pointIndex !== 'number') {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Quadrant or point index invalid'
    })
  }

  const checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex].checkers[0]

  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })
  const oldDestination = board.off[checkerToMove.color]
  const newDestination = produce(oldDestination, draft => {
    draft.checkers.push(checkerToMove)
  })
  return produce(board, draft => {
    // FIXME
    draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    draft.off[checkerToMove.color] = newDestination
  })

}



export function getQuadrantAndPointIndexForCheckerbox (board: Board, id: string | undefined) {
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
        console.log(checkerbox.position)
        console.log(typeof checkerbox.position)
        throw new GameError({
          model: 'Move',
          errorMessage: 'NO QI'
        })

      }
      pointIndex = board.quadrants[quadrantIndex].points.findIndex(p => p.id === id)
    } else {
      throw Error('No origin checkerbox')
    }
    return { quadrantIndex, pointIndex }

  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No checkerbox'
    })
  }
}

function getCheckerBoxes (board: Board): CheckerBox[] {
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

export const getMoveMode = (origin: CheckerBox, destination: CheckerBox, activeColor: Color, activePlayer: Player, dieValue: DieValue): MoveMode => {
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
      throw new GameError({ model: 'Move', errorMessage: 'Player moves clockwise' })
    }
    if (activePlayer.moveDirection === 'counterclockwise' && destination.position > origin.position) {
      throw new GameError({ model: 'Move', errorMessage: 'Player moves counterclockwise' })
    }
    if (destination.checkers && destination.checkers.length === 1 && destination.checkers[0].color !== activeColor) {
      return MoveMode.HIT
    } else {
      return MoveMode.POINT_TO_POINT
    }
  } else if (origin.position === 'rail' && typeof destination.position === 'number') {
    return MoveMode.REENTER
  } else if (typeof origin.position === 'number' && destination.position === 'off') {
    return MoveMode.OFF
  } else {
    throw new GameError({ model: 'Move', errorMessage: 'Unknown MoveMode' })
  }
}
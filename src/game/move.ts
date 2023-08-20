import { produce } from 'immer'
import { Color, isColor } from '.'
import { GameError } from './game'
import { getCheckerBoxes } from '../components/Board/state/types/board'
import { Board, } from '../components/Board/state'
import { QuadrantLocation } from '../components/Quadrant/state/types'
import { Checker, isChecker } from '../components/Checker/state'
import { CheckerBox, isCheckerBox } from '../components/CheckerBox/state/types'
import { Rail, isRail } from '../components/Rail/state/types'
import { DieValue } from '../components/Die/state'
import { Player } from '../components/Player/state'
import { GAME_ACTION_TYPE } from './game.reducer'
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

// Start move methods
export const pointToPoint = (board: Board, move: Move): Board => {
  if (!move.origin || !move.destination) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }

  if (Math.abs((move.origin.position as number) - (move.destination.position as number)) !== (move.dieValue as number)) {
    // throw new GameError({ model: 'Move', errorMessage: 'Move does not match die value' })
    console.error('Move does not match die')
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
    if (originInfo.quadrantIndex !== -1 && originInfo.pointIndex !== -1) {
      const draftCheckers = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers
      checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[draftCheckers.length - 1]
      if (!checkerToMove) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checker to move'
        })
      } else {
        // FIXME typeguard
        let ctm: Checker = checkerToMove as Checker
        // Player has checkers on the rail and must move them first
        if (board.rail[ctm.color].checkers.length > 0) {
          console.log('Checkers on the rail')
          return board
        }
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
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin'
      })
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
  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })
  const boardCheckers = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers
  const checkerToMove = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number].checkers[boardCheckers.length - 1] as Checker
  if (!isColor(checkerToMove.color)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid color'
    })
  }

  let maxPosition: number = move.dieValue
  board.quadrants[originInfo.quadrantIndex].points.forEach(p => {
    if (p.checkers.length > 0) {
      maxPosition = p.position as number
    }
  })
  console.log(move)
  console.log(oldOrigin)
  console.log(maxPosition)

  if (move.dieValue === oldOrigin.position || move.dieValue >= maxPosition) {
    return produce(board, draft => {
      draft.off[checkerToMove.color].checkers.push(checkerToMove)
      draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    })
  } else {
    console.log(move.dieValue)
    console.log(oldOrigin.position)
    console.log(maxPosition)
    console.error('Cannot move to off from that point with current dieValue')
  }
  return board
}

export const hit = (board: Board, move: Move): Board => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }
  const originInfo = getQuadrantAndPointIndexForCheckerbox(board, move.origin.id)
  const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)

  // FIXME: Write propper typeguard
  if (typeof originInfo.quadrantIndex !== 'number' || typeof originInfo.pointIndex !== 'number') {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Quadrant or point index invalid'
    })
  }

  const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex]
  const checkerToMove = oldOrigin.checkers[oldOrigin.checkers.length - 1]
  const newOrigin = produce(oldOrigin, draft => {
    draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
  })

  const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
  const hitChecker = oldDestination.checkers[0]
  const newDestination = produce(oldDestination, draft => {
    draft.checkers = [checkerToMove]
  })

  const oldRail = board.rail[hitChecker.color]
  const newRail = produce(oldRail, draft => {
    draft.checkers.push(hitChecker)
  })

  return produce(board, draft => {
    draft.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number] = newOrigin
    draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
    draft.rail[hitChecker.color] = newRail
  })
}

export const reenter = (board: Board, move: Move): Board | undefined => {
  if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Missing origin or destination'
    })
  }
  const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)
  const checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
  if (!isColor(checkerToMove.color)) {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Invalid color'
    })
  }
  const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]

  if (oldDestination.checkers.length === 1 && oldDestination.checkers[0].color !== checkerToMove.color) {
    if (!isCheckerBox(move.origin) || !isCheckerBox(move.destination)) {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Missing origin or destination'
      })
    }
    const oldOrigin = board.rail[checkerToMove.color]
    const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)

    const newOrigin = produce(oldOrigin, draft => {
      draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
    })
    console.log(newOrigin)

    const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex]
    const hitChecker = oldDestination.checkers[0]
    const newDestination = produce(oldDestination, draft => {
      draft.checkers = [checkerToMove]
    })

    const oldRail = board.rail[hitChecker.color]
    const newRail = produce(oldRail, draft => {
      draft.checkers.push(hitChecker)
    })

    return produce(board, draft => {
      draft.rail[checkerToMove.color] = newOrigin
      draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
      draft.rail[hitChecker.color] = newRail
    })
  } else {
    console.log('PLAIN REENTER')

    return produce(board, draft => {
      if (!isRail(move.origin)) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Origin is not a rail'
        })
      }
      if (!move.origin) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Missing origin'
        })
      }
      if (!move.destination) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'Missing destination'
        })
      }

      const destinationInfo = getQuadrantAndPointIndexForCheckerbox(board, move.destination.id)
      if (!checkerToMove) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No checker to move'
        })
      } else {
        // FIXME typeguard
        const checkerToMove = move.origin.checkers[move.origin.checkers.length - 1]
        // Player has checkers on the rail and must move them first
        // const oldOrigin = board.quadrants[originInfo.quadrantIndex].points[originInfo.pointIndex as number]
        const oldOrigin = board.rail[checkerToMove.color]
        console.log(oldOrigin)
        const newOrigin = produce(oldOrigin, draft => {
          draft.checkers.splice(oldOrigin.checkers.length - 1, 1)
        })
        console.log(newOrigin)
        const oldDestination = board.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number]
        const newDestination = produce(oldDestination, draft => {
          draft.checkers.push(checkerToMove)
        })
        return produce(board, draft => {
          draft.rail[checkerToMove.color] = newOrigin
          draft.quadrants[destinationInfo.quadrantIndex].points[destinationInfo.pointIndex as number] = newDestination
        })
      }
    })
  }
}

function getQuadrantAndPointIndexForCheckerbox (board: Board, id: string | undefined) {
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
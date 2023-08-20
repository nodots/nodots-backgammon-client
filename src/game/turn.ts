import { generateId, GameError } from '.'
import { isCheckerBox } from '../components/CheckerBox/state'
import { Player } from '../components/Player/state/types/player'
import { Board, Move, MoveStatus } from '../components/Board/state/types'
import { DieValue, Roll } from '../components/Die/state/types'
import { POINT_COUNT, getCheckerBoxes } from '../components/Board/state/types/board'
import { QuadrantLocation } from '../components/Quadrant/state'
import { getHomeQuadrantLocation } from '../components/Player/state/types/player'

export const MOVES_PER_TURN = 2

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  AWAITING_FINALIZATION,
  FINALIZED,
  ERROR,
  NO_MOVES
}

export type Turn = {
  id: string | undefined
  board: Board | undefined
  player: Player | undefined
  status: TurnStatus | undefined
  roll: Roll | undefined
  moves: Move[]
}

export const initializeMoves = (board: Board, roll: Roll, player: Player): Move[] => {
  let moveCount = MOVES_PER_TURN
  const moves: Move[] = []
  // Handle double roll
  if (roll[0] === roll[1]) {
    moveCount = moveCount * 2
  }
  for (let i = 0; i < moveCount; i++) {
    const dieValue = i % 2 ? roll[1] : roll[0]
    let canmove = false

    // FIXME: This is wrong because it allows player to "reuse" rolls
    if (canMove(board, roll[0], player) || canMove(board, roll[1], player)) {
      canmove = true
    }
    const move: Move = {
      id: generateId(),
      dieValue,
      status: canmove ? MoveStatus.INITIALIZED : MoveStatus.NO_MOVE
    }
    moves.push(move)
  }
  return moves
}

function canMove (board: Board, dieValue: DieValue, player: Player): boolean {
  const checkerboxes = getCheckerBoxes(board)
  let destinationCount = 0
  const originPoints = checkerboxes.filter(cb => cb.checkers.length > 0 && cb.checkers[0].color === player.color && cb.position !== 'off')
  const railCheckers = board.rail[player.color].checkers
  console.log(railCheckers)

  if (railCheckers.length > 0) {
    // Player is on the rail and must move from there before doing anything else
    console.error('On the rail')
    if (typeof dieValue !== 'number') {
      throw new GameError({
        model: 'Move',
        errorMessage: 'Bad die value'
      })
    }
    if (railCheckers.length > 1) {

    }
    const homeQuadrantLocation = getHomeQuadrantLocation(player.moveDirection)
    const homeQuadrant = board.quadrants.find(q => q.location === homeQuadrantLocation)
    if (homeQuadrant) {
      let possibleDestinationPosition = dieValue as number
      if (player.moveDirection === 'counterclockwise') {
        possibleDestinationPosition = POINT_COUNT - dieValue + 1
      }
      console.error(`possibleDestinationPosition = ${possibleDestinationPosition} for dieValue ${dieValue}`)
      const possibleDestination = checkerboxes.find(cb => cb.position === possibleDestinationPosition)
      console.log(possibleDestination)
      if (
        (
          possibleDestination &&
          possibleDestination.checkers.length <= 1 // either open or hittable
        ) ||
        (
          possibleDestination &&
          possibleDestination.checkers.length > 1 &&
          possibleDestination.checkers[0].color === player.color // player owns the point
        )) {
        destinationCount++
      }
    }
  } else {
    originPoints.forEach(cb => {
      const possibleDestinationPosition = cb.position as number + dieValue
      const possibleDestination = checkerboxes.find(cb => typeof cb.position === 'number' && cb.position === possibleDestinationPosition)
      if (
        (
          possibleDestination &&
          possibleDestination.checkers.length <= 1 // either open or hittable
        ) ||
        (
          possibleDestination &&
          possibleDestination.checkers.length > 1 &&
          possibleDestination.checkers[0].color === player.color // player owns the point
        )) {
        destinationCount++
      }
    })
  }

  if (destinationCount > 0) {
    return true
  }
  return false
}
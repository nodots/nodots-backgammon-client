import { v4 as generateId } from 'uuid'
import { produce } from 'immer'
import { GameError } from '.'
import { Player, isPlayer } from '../components/Player/state/types/player'
import { Board, Move, MoveStatus } from '../components/Board/state/types'
import { DieValue, Roll } from '../components/Die/state/types'
import { POINT_COUNT, getCheckerBoxes, isBoard } from '../components/Board/state/types/board'
import { getHomeQuadrantLocation } from '../components/Player/state/types/player'
import { BgWebApiPlay } from './integrations/bgweb-api'

export const MOVES_PER_TURN = 2

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  AWAITING_FINALIZATION,
  FINALIZED,
  ERROR,
  NO_MOVES
}

export type MoveCoords = [number, number]
export type Play = {
  moves: MoveCoords[]
}

export type Turn = {
  id: string
  board: Board
  player: Player
  roll: Roll
  status: TurnStatus | undefined
  moves: Move[]
}

export const isTurn = (t: any): t is Turn => {
  if (typeof t !== 'object') {
    return false
  }

  const keys = Object.keys(t)
  const idIndex = keys.findIndex(k => k === 'id')
  if (idIndex === -1) {
    return false
  }

  const boardIndex = keys.findIndex(k => k === 'board')
  if (boardIndex === -1) {
    return false
  }
  if (!isBoard(t.board)) {
    return false
  }

  const playerIndex = keys.findIndex(k => k === 'player')
  if (playerIndex === -1) {
    return false
  }
  if (!isPlayer(t.player)) {
    return false
  }

  const statusIndex = keys.findIndex(k => k === 'status')
  if (statusIndex === -1) {
    return false
  }

  return true
}

export interface InitializeTurnAction {
  board: Board,
  player: Player,
  roll: Roll
}

export const initializeTurn = (action: InitializeTurnAction): Turn => {
  const moves: Move[] = initializeMoves(action)

  const turn: Turn = {
    id: generateId(),
    board: action.board,
    player: action.player,
    roll: action.roll,
    status: TurnStatus.INITIALIZED,
    moves: moves,
    gnuBgBestMoves: []
  }
  return turn
}

export const resetTurn = (turn: Turn): Turn => {
  return produce(turn, draft => {
    draft.status = undefined
    draft.moves = []
  })
}

export const initializeMoves = (action: InitializeTurnAction): Move[] => {
  const board = action.board
  const roll = action.roll
  const player = action.player
  const moveDirection = player.moveDirection

  let moveCount = MOVES_PER_TURN
  const moves: Move[] = []

  // Handle double roll
  if (roll[0] === roll[1]) {
    moveCount = moveCount * 2
  }
  for (let i = 0; i < moveCount; i++) {
    const dieValue = i % 2 ? roll[1] : roll[0]
    let canmove = canMove(board, dieValue, player)

    const move: Move = {
      id: generateId(),
      dieValue,
      order: i,
      direction: moveDirection,
      status: canmove ? MoveStatus.INITIALIZED : MoveStatus.NO_MOVE,
      hit: undefined
    }
    moves.push(move)
  }
  return moves
}

function canMove (board: Board, dieValue: DieValue, player: Player): boolean {
  const checkerboxes = getCheckerBoxes(board)
  let destinationCount = 0
  const originPoints = checkerboxes.filter(cb => cb.checkers.length > 0 && cb.checkers[0].color === player.color && cb.position !== 'off')
  if (typeof dieValue !== 'number') {
    throw new GameError({
      model: 'Move',
      errorMessage: 'Bad die value'
    })
  }
  const homeQuadrantLocation = getHomeQuadrantLocation(player.moveDirection)
  const homeQuadrant = board.quadrants.find(q => q.location === homeQuadrantLocation)
  if (homeQuadrant) {
    let possibleDestinationPosition = dieValue as number
    if (player.moveDirection === 'counterclockwise') {
      possibleDestinationPosition = POINT_COUNT - dieValue + 1
    }
    const possibleDestination = checkerboxes.find(cb => cb.position === possibleDestinationPosition)
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

  if (destinationCount > 0) {
    return true
  }
  return false
}

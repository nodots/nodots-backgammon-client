import { v4 as generateId } from 'uuid'
import { produce } from 'immer'
import { Player, isPlayer } from './player'
import { Move, MoveStatus } from './move'
import { Roll } from '../components/Die/state'
import { Board } from '../components/Board/state/types'
import { Checkerbox } from '../components/Checkerbox/state/types'
import { getCheckerboxes, isBoard } from '../components/Board/state/types'
import { BgWebApiPlay, BgWebApi_TurnAnalysis } from './integrations/bgweb-api'

export const MOVES_PER_TURN = 2

export type Analytics = {
  api: string
  analysis: any
}

export enum TurnStatus {
  INITIALIZED,
  IN_PROGRESS,
  AWAITING_FINALIZATION,
  FINALIZED,
  ERROR,
  NO_MOVES,
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
  analytics: Analytics[]
}

export const isTurn = (t: any): t is Turn => {
  if (typeof t !== 'object') {
    return false
  }

  const keys = Object.keys(t)
  const idIndex = keys.findIndex((k) => k === 'id')
  if (idIndex === -1) {
    return false
  }

  const boardIndex = keys.findIndex((k) => k === 'board')
  if (boardIndex === -1) {
    return false
  }
  if (!isBoard(t.board)) {
    return false
  }

  const playerIndex = keys.findIndex((k) => k === 'player')
  if (playerIndex === -1) {
    return false
  }
  if (!isPlayer(t.player)) {
    return false
  }

  const statusIndex = keys.findIndex((k) => k === 'status')
  if (statusIndex === -1) {
    return false
  }

  return true
}

export interface InitializeTurnAction {
  board: Board
  player: Player
  roll: Roll
  analytics?: Analytics[]
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
    analytics: [],
  }
  return turn
}

export const resetTurn = (turn: Turn): Turn => {
  return produce(turn, (draft) => {
    draft.status = undefined
    draft.moves = []
  })
}

export const initializeMoves = (action: InitializeTurnAction): Move[] => {
  const board = action.board
  const roll = action.roll
  const player = action.player
  const analytics = action.analytics
  const moveDirection = player.moveDirection

  console.log('initializeMoves analytics:', analytics)

  let moveCount = MOVES_PER_TURN
  const moves: Move[] = []

  // Handle double roll
  if (roll[0] === roll[1]) {
    moveCount = moveCount * 2
  }

  for (let i = 0; i < moveCount; i++) {
    const dieValue = i % 2 ? roll[1] : roll[0]
    let canmove = canMove(board, player, analytics)
    // console.log(`canmove = ${canmove}`)

    const move: Move = {
      id: generateId(),
      dieValue,
      order: i,
      direction: moveDirection,
      status: canmove ? MoveStatus.INITIALIZED : MoveStatus.NO_MOVE,
      hit: undefined,
    }
    moves.push(move)
  }
  return moves
}

type CanMove = boolean | 'forced'

function canMove(
  board: Board,
  player: Player,
  analytics: Analytics[] | undefined
): CanMove {
  const checkerboxes = getCheckerboxes(board)

  const gnuAnalytics: Analytics | undefined = analytics?.find(
    (a) => a.api === 'bgwebapi'
  )

  let gnuPlayAnalysis = gnuAnalytics?.analysis as BgWebApi_TurnAnalysis[]
  const gnuPlays: BgWebApiPlay[] = []
  if (gnuPlayAnalysis) {
    gnuPlayAnalysis.forEach((gpa) => {
      gpa.play.forEach((p) => {
        gnuPlays.push(p)
      })
    })
  }

  const originPoints = checkerboxes.filter(
    (cb) =>
      cb.checkers.length > 0 &&
      cb.checkers[0].color === player.color &&
      cb.position !== 'off'
  )
  const matchingPoints: Checkerbox[] = []
  gnuPlays.forEach((p) => {
    originPoints.filter((op) => {
      if (
        op.position === 'bar' ||
        (player.moveDirection === 'counterclockwise' &&
          op.positionCounterClockwise == p.from)
      ) {
        matchingPoints.push(op)
      } else if (
        player.moveDirection === 'clockwise' &&
        op.positionClockwise == p.from
      ) {
        matchingPoints.push(op)
      }
    })
  })

  if (matchingPoints.length === 0) {
    return false
  } else if (matchingPoints.length === 1) {
    return 'forced'
  } else {
    return true
  }
}

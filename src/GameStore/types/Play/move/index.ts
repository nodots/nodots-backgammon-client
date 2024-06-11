import { NodotsPlay, getNextMoveInPlay as getActiveMove } from '..'
import { MoveDirection } from '../..'
import {
  NodotsBoardStore,
  getCheckercontainer,
  getCheckercontainers,
} from '../../Board'
import { Checker, getChecker } from '../../Checker'
import { Bar, Checkercontainer, Off, Point } from '../../Checkercontainer'
import { DieValue, Roll } from '../../Dice'
import { NodotsMessage } from '../../Message'
import {
  MovingPlayer,
  NodotsPlayers,
  NodotsPlayer,
  WinningPlayer,
} from '../../Player'
import { hit } from './Hit'
import { pointToPoint } from './PointToPoint'
import { reenter } from './Reenter'
import { getDestinationForOrigin, isMoveHit } from './helpers'

// TODO: Implement revert move
// TODO: Implement forced moves
export interface NodotsMove {
  id: string
  kind:
    | 'move-proposed'
    | 'move-moving'
    | 'move-moved'
    | 'move-no-move'
    | 'move-initializing'
  isAuto: boolean
  isForced: boolean
  board: NodotsBoardStore
  player: NodotsPlayer
  dieValue: DieValue
  direction: MoveDirection
  timestamp: string
}

export interface MoveInitializing extends NodotsMove {
  kind: 'move-initializing'
}

export interface MoveMoving extends NodotsMove {
  kind: 'move-moving'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface Proposed extends NodotsMove {
  kind: 'move-proposed'
  move: NodotsMove
  origin: Checkercontainer
  destination: Checkercontainer
}

export interface Moved extends NodotsMove {
  kind: 'move-moved'
  move: NodotsMove
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  players: NodotsPlayers
}

export interface NoMove extends NodotsMove {
  kind: 'move-no-move'
  message: NodotsMessage
}

export type NodotsMoveState =
  | MoveInitializing
  | MoveMoving
  | Moved
  | NoMove
  | Proposed

export interface NodotsMovePayload {
  state: NodotsMoveState
  checker: Checker
  origin: Checkercontainer
  destination: Checkercontainer
  moves: NodotsMove[]
  move: NodotsMove
  players: NodotsPlayers
}

export interface PossibleMove {
  origin: Checkercontainer // FIXME
  destination: Checkercontainer
}
export type PossibleMoves = PossibleMove[]

export const move = (
  play: NodotsPlay,
  checkerId: string,
  board: NodotsBoardStore,
  players: NodotsPlayers
): NodotsMove => {
  const { player } = play
  const checker = getChecker(board, checkerId)
  const activeMove = getActiveMove(play)
  console.log(activeMove)

  const options = play.analysis.options

  if (!options || options.length === 0) {
    return {
      ...play,
      kind: 'move-no-move',
      board,
      player,
      direction: player.direction,
      dieValue: activeMove.dieValue,
    }
  }

  const origin = getCheckercontainers(board).find((checkercontainer) =>
    checkercontainer.checkers.find((checker) => checker.id === checkerId)
  ) as Checkercontainer

  const destination = getDestinationForOrigin(
    board,
    player,
    origin,
    activeMove.dieValue
  )
  if (!destination) {
    return {
      ...moveState,
      kind: 'move-moved-failed',
      message: {
        game: `No destination for origin ${origin.id}`,
      },
    }
  }
  const payload: NodotsMovePayload = {
    state: moveState,
    checker,
    origin,
    destination,
    players,
  }

  if (isMoveHit(payload)) {
    hit(moveState, destination)
  }

  switch (origin.kind) {
    case 'point':
      return pointToPoint(payload)
    case 'bar':
      return reenter(payload)
    default:
      throw Error(`Invalid origin kind ${origin.kind}`)
  }
}

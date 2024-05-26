import { Color, MoveDirection, NodotsGameState } from '.'
import { NodotsDice } from './Dice'
import { NodotsMoveState } from './move'
import { isReentering } from './move/helpers'
import { isBearOffing } from './move/helpers'

export type Player = {
  kind:
    | 'initializing'
    | 'waiting'
    | 'moving'
    | 'reentering'
    | 'bearing-off'
    | 'won'
  id: string
  username: string
  color: Color
  dice: NodotsDice
  direction: MoveDirection
  pipCount: number
  automation: {
    move: boolean
    roll: boolean
  }
}

export interface InitializingPlayer extends Player {
  kind: 'initializing'
}

export interface WaitingPlayer extends Player {
  kind: 'waiting'
}

export interface MovingPlayer extends Player {
  kind: 'moving'
  moveState: NodotsMoveState
}

export interface ReenteringPlayer extends Player {
  kind: 'reentering'
  moveState: NodotsMoveState
}

export interface BearingOffPlayer extends Player {
  kind: 'bearing-off'
  moveState: NodotsMoveState
}

export interface WinningPlayer extends Player {
  kind: 'won'
  moveState: NodotsMoveState
}

export type NodotsPlayer =
  | InitializingPlayer
  | MovingPlayer
  | WaitingPlayer
  | BearingOffPlayer
  | ReenteringPlayer
  | WinningPlayer

export interface NodotsPlayers {
  black: NodotsPlayer
  white: NodotsPlayer
}

export interface NodotsPipCounts {
  black: number
  white: number
}

export const getActivePlayer = (
  state: NodotsGameState,
  activeColor: Color,
  players: NodotsPlayers
): Player => {
  const untypedPlayer = players[activeColor]

  if (isBearOffing(state.boardStore, untypedPlayer)) {
    const activePlayer = untypedPlayer as BearingOffPlayer
    return activePlayer
  }

  if (isReentering(state.boardStore, untypedPlayer)) {
    const activePlayer = untypedPlayer as ReenteringPlayer
    return activePlayer
  }

  const activePlayer = activeColor === 'black' ? players.black : players.white

  return activePlayer
}

export const getClockwisePlayer = (players: NodotsPlayers): NodotsPlayer =>
  players.black.direction === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (
  players: NodotsPlayers
): NodotsPlayer =>
  players.black.direction === 'counterclockwise' ? players.black : players.white

export const getPlayerForMoveDirection = (
  players: NodotsPlayers,
  direction: MoveDirection
): Player =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

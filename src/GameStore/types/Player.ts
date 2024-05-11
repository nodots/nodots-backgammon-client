import { Color, MoveDirection, NodotsGameState } from '.'
import { Dice } from './Dice'
import { isBearOffing, isReentering, isMoving, NodotsMoveState } from './move'

export type Player = {
  kind: 'initializing' | 'waiting' | 'moving' | 'reentering' | 'bearing-off'
  id: string
  username: string
  color: Color
  dice: Dice
  moveDirection: MoveDirection
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

export type NodotsPlayer =
  | InitializingPlayer
  | MovingPlayer
  | WaitingPlayer
  | BearingOffPlayer
  | ReenteringPlayer

export interface NodotsPlayers {
  white: NodotsPlayer
  black: NodotsPlayer
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

  // if (isMoving(state)) {
  //   const activePlayer = untypedPlayer as MovingPlayer
  //   return activePlayer
  // }

  const activePlayer = activeColor === 'black' ? players.black : players.white

  return activePlayer
}

export const getClockwisePlayer = (players: NodotsPlayers): NodotsPlayer =>
  players.black.moveDirection === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (
  players: NodotsPlayers
): NodotsPlayer =>
  players.black.moveDirection === 'counterclockwise'
    ? players.black
    : players.white

export const getPlayerForMoveDirection = (
  players: NodotsPlayers,
  direction: MoveDirection
): Player =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

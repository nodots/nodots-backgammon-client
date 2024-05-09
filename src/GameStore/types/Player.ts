import { Color, MoveDirection, NodotsGameState } from '.'
import { Dice } from './Dice'
import { isBearOff } from './move'

export type Player = {
  kind: 'moving' | 'reentering' | 'bearing-off'
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

export interface MovingPlayer extends Player {
  kind: 'moving'
}

export interface ReenteringPlayer extends Player {
  kind: 'reentering'
}
export interface BearingOffPlayer extends Player {
  kind: 'bearing-off'
}

export interface Players {
  white: Player
  black: Player
}

export const getActivePlayer = (
  state: NodotsGameState,
  activeColor: Color,
  players: Players
): Player => {
  const untypedPlayer = players[activeColor]
  if (isBearOff(state.boardStore, untypedPlayer)) {
    const activePlayer = untypedPlayer as BearingOffPlayer
    return activePlayer
  }
  if (isReenter(state.boardStore, untypedPlayer)) {
    console.log('nope')
  }
  const activePlayer = activeColor === 'black' ? players.black : players.white

  return activePlayer
}

export const getClockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (players: Players): Player =>
  players.black.moveDirection === 'counterclockwise'
    ? players.black
    : players.white

export const getPlayerForMoveDirection = (
  players: Players,
  direction: MoveDirection
): Player =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

import { NodotsGame } from '../Game'
import { Color, MoveDirection } from '../Game/types'
import { isBearOffing, isReentering } from '../Move/helpers'
import { NodotsPlayer, NodotsPlayers } from './Types'

export const getActivePlayer = (
  activeColor: Color,
  players: NodotsPlayers
): NodotsPlayer => {
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
): NodotsPlayer =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

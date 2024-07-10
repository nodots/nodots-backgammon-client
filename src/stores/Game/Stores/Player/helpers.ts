import { NodotsColor, MoveDirection } from '../../Types'
import { INodotsPlayer, NodotsPlayers } from './Types'

export const getActivePlayer = (
  activeColor: NodotsColor,
  players: NodotsPlayers
): INodotsPlayer => {
  const activePlayer = activeColor === 'black' ? players.black : players.white

  return activePlayer
}

export const getClockwisePlayer = (players: NodotsPlayers): INodotsPlayer =>
  players.black.direction === 'clockwise' ? players.black : players.white

export const getCounterclockwisePlayer = (
  players: NodotsPlayers
): INodotsPlayer =>
  players.black.direction === 'counterclockwise' ? players.black : players.white

export const getPlayerForMoveDirection = (
  players: NodotsPlayers,
  direction: MoveDirection
): INodotsPlayer =>
  direction === 'clockwise'
    ? getClockwisePlayer(players)
    : getCounterclockwisePlayer(players)

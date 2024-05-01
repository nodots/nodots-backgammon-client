import { Color, MoveDirection, PointPosition, generateId } from '.'
import { Dice } from './Dice'
import { PlayerBoard, Points } from './Board'
import { Point } from './Checkercontainer'
import { Checker, generateCheckersForCheckercontainerId } from './Checker'
import NodotsGameStore from '..'

export type Player = {
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

export const getActivePlayer = (activeColor: Color, players: Players): Player =>
  activeColor === 'black' ? players.black : players.white

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

export interface Players {
  white: Player
  black: Player
}

import { Board, getPoints } from './Board'
import { Checkercontainer, Point } from './Checkercontainer'
import { DieValue } from './Dice'
import { Player } from './Player'

export interface NodotsMove {
  from: Checkercontainer | undefined
  to: Checkercontainer | undefined
  dieValue: DieValue
}

export type NodotsMoves =
  | [NodotsMove, NodotsMove]
  | [NodotsMove, NodotsMove, NodotsMove, NodotsMove]

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const getOriginPointById = (board: Board, id: string): Point => {
  const point = getPoints(board).find((point) => point.id === id)
  if (!point) {
    throw new Error(`Could not find point for id ${id}`)
  }
  return point
}

export const getDestinationPointFromOriginPoint = (
  board: Board,
  origin: Point,
  dieValue: DieValue,
  player: Player
): Point => {
  const originPosition = origin.position[player.moveDirection]
  const destinationPosition = originPosition + dieValue

  const destination = getPoints(board).find(
    (point) => point.position[player.moveDirection] === destinationPosition
  )

  if (!destination) {
    throw new Error(
      `Could not find destination from origin: ${JSON.stringify(origin)}`
    )
  }

  return destination
}

import { Moving, Rolling, Confirming, Rolled } from '.'
import { NodotsBoardStore, getCheckercontainerById, getPoints } from './Board'
import { getChecker } from './Checker'
import { Checkercontainer, Point } from './Checkercontainer'
import { DieValue } from './Dice'
import { NodotsMessage } from './Message'
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

export const getOriginPointById = (
  board: NodotsBoardStore,
  id: string
): Point => {
  const point = getPoints(board).find((point) => point.id === id)
  if (!point) {
    throw new Error(`Could not find point for id ${id}`)
  }
  return point
}

export const getDestinationPointFromOriginPoint = ({
  board,
  origin,
  dieValue,
  player,
}: {
  board: NodotsBoardStore
  origin: Point
  dieValue: DieValue
  player: Player
}): Point => {
  console.log(`[Move] origin:`, origin.position)
  const originPosition = origin.position[player.moveDirection]
  console.log(`[Move] originPosition:`, originPosition)
  const destinationPosition = originPosition - dieValue

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

export const move = (
  state: Rolled | Moving,
  activePlayer: Player,
  checkerId: string
): Moving | Confirming => {
  const { board, players, cube, activeColor, moves, roll } = state
  const checker = getChecker(board, checkerId)
  checker.highlight = true

  const nextMove = getNextMove(moves)
  const origin = getCheckercontainerById(board, checker.locationId)

  if (!nextMove) {
    throw new Error('End of turn not supported')
  }

  if (origin.kind === 'point') {
    const destination = getDestinationPointFromOriginPoint({
      board,
      origin: origin as Point,
      dieValue: nextMove.dieValue,
      player: activePlayer,
    })

    origin.checkers = origin.checkers.filter(
      (checker) => checker.id !== checkerId
    )
    destination.checkers.push(checker)

    nextMove.from = origin
    nextMove.to = destination

    const message: NodotsMessage = {
      debug: `JSON.stringify(moves)`,
    }

    return {
      kind: 'moving',
      board,
      players,
      cube,
      activeColor,
      moves,
      roll,
      message,
    }
  }
  return {
    kind: 'moving',
    board,
    players,
    cube,
    activeColor,
    moves,
    roll,
  }
}

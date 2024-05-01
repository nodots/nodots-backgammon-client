import checker from 'vite-plugin-checker'
import {
  Moving,
  Rolling,
  Confirming,
  Rolled,
  getInactiveColor,
  OriginPosition,
} from '.'
import {
  NodotsBoardStore,
  getCheckercontainer,
  getCheckercontainers,
  getCheckers,
  getPoints,
} from './Board'
import { Checker, getChecker } from './Checker'
import { Bar, Checkercontainer, Off, Point } from './Checkercontainer'
import { DieValue } from './Dice'
import { NodotsMessage } from './Message'
import { Player, getActivePlayer } from './Player'

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

export const getDestinationForOrigin = (
  store: NodotsBoardStore,
  origin: Checkercontainer,
  dieValue: DieValue,
  player: Player
): Checkercontainer => {
  console.log(origin.kind)
  switch (origin.kind) {
    case 'point':
      {
        const originPoint = origin as Point
        let destination: Point = originPoint
        const destinationPosition =
          player.moveDirection === 'clockwise'
            ? originPoint.position.clockwise - dieValue
            : originPoint.position.clockwise + dieValue
        console.log(destinationPosition)
      }

      break
    default:
      console.log(origin.kind)
  }
  let destination = store.off.black
  return destination
}

export const move = (
  state: Rolled | Moving,
  checkerId: string
): Moving | Confirming => {
  const { players, cube, activeColor, boardStore, moves, roll, message } = state

  const inactiveColor = getInactiveColor(activeColor)
  const activePlayer = getActivePlayer(activeColor, players)
  const moveDirection = activePlayer.moveDirection

  const nextMove = getNextMove(moves)

  if (!nextMove) {
    return {
      kind: 'confirming',
      players,
      cube,
      activeColor,
      boardStore,
      roll,
      moves,
      message,
    }
  } else {
    const checkers = getCheckers(boardStore)
    const checkerToMove = checkers.find((checker) => checker.id === checkerId)
    const activePlayer = getActivePlayer(activeColor, players)
    if (!checkerToMove) {
      throw Error(`No checkerToMove for ${checkerId}`)
    } else {
      const origin = getCheckercontainer(
        boardStore,
        checkerToMove.checkercontainerId
      )

      const destination = getDestinationForOrigin(
        boardStore,
        origin,
        nextMove.dieValue,
        activePlayer
      )

      const debug = `ORIGIN > kind: ${origin.kind} color: ${
        origin.checkers[0].color
      } checkers: ${origin.checkers.length}
      DESTINATION > kind: ${destination.kind} color: ${
        destination.checkers.length > 0
          ? destination.checkers[0].color
          : 'No checkers'
      } checkers: ${destination.checkers.length}
      `

      switch (origin.kind) {
        case 'point':
          const point = origin as Point
          const destinationPosition =
            activePlayer.moveDirection === 'clockwise'
              ? point.position.clockwise - nextMove.dieValue
              : point.position.clockwise + nextMove.dieValue
          const destination = boardStore.points.find(
            (point) => point.position.clockwise === destinationPosition
          )

          if (!destination) {
            throw Error(`No destination for ${destinationPosition}`)
          }

          if (
            destination.checkers.length > 1 &&
            destination.checkers[0].color !== activeColor
          ) {
            return {
              kind: 'moving',
              players,
              cube,
              activeColor,
              boardStore,
              moves,
              roll,
              message: {
                ...message,
                debug: '',
              },
            }
          }

          // Hit. This is separate from the active player's checker move so deal with it now
          if (
            destination.checkers.length === 1 &&
            destination.checkers[0].color !== activeColor
          ) {
            const hitChecker = destination.checkers.pop() as Checker
            boardStore.bar[hitChecker.color].checkers.push(hitChecker)
          }

          nextMove.from = origin
          nextMove.to = destination

          origin.checkers = origin.checkers.filter(
            (checker) => checker.id !== checkerToMove.id
          )
          destination.checkers.push(checkerToMove)

          return {
            kind: 'moving',
            players,
            cube,
            activeColor,
            boardStore,
            roll,
            moves,
            message: { ...message, debug: 'p2p move' },
          }

          break
        case 'bar':
          console.log('reentering')
          break
        default:
          console.log('Nope')
      }

      const newMessage = {
        ...message,
        debug,
      }

      return {
        kind: 'moving',
        players,
        cube,
        activeColor,
        boardStore,
        roll,
        moves,
        message: newMessage,
      }
    }
  }
}

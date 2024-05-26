import { NodotsMove, NodotsMovePayload, NodotsMoveState, NodotsMoves } from '.'
import { CHECKERS_PER_PLAYER, NodotsGameState } from '..'
import { NodotsBoardStore, getPoints } from '../Board'
import { Checkercontainer, Off, Point } from '../Checkercontainer'
import { Roll } from '../Dice'
import { NodotsPlayer, Player } from '../Player'

export const gameStateKey = 'nodots-game-state'

export const getDestinationForOrigin = (
  state: NodotsMoveState,
  origin: Checkercontainer,
  activeMove: NodotsMove
): Off | Point | undefined => {
  const { board, player } = state
  switch (origin.kind) {
    case 'point':
      const originPoint = origin as Point
      const delta = activeMove.dieValue * -1
      const dpp = originPoint.position[player.direction] + delta

      const mostDistantPointPosition = getMostDistantOccupiedPointPosition(
        board,
        player
      )

      if (dpp === 0) {
        return board.off[player.color]
      } else if (dpp > 0) {
        const d = board.points.find(
          (point) => point.position[player.direction] === dpp
        )
        if (!d) {
          return undefined
        }
        return d
      } else if (
        dpp < 0 &&
        originPoint.position[player.direction] > mostDistantPointPosition * -1
      ) {
        return board.off[player.color]
      } else {
        console.error('Could not find destination:')
        console.error('destinationPointPosition:', dpp)
        console.error('mostDistantPointPosition:', mostDistantPointPosition)
      }
      break
    case 'bar':
      const reentryPosition = 25 - activeMove.dieValue
      const reentryPoint = state.board.points.find((point) => {
        return point.position[activeMove.direction] === reentryPosition
      }) as Point // FIXME
      if (
        reentryPoint.checkers.length > 1 &&
        reentryPoint.checkers[0].color !== player.color
      ) {
        return undefined
      }
      return reentryPoint
    case 'off':
    default:
      break
  }
}

const getMostDistantOccupiedPointPosition = (
  board: NodotsBoardStore,
  player: NodotsPlayer
) => {
  if (board.bar[player.color].checkers.length > 0) return 25 // Player is on the bar
  const occupiedPoints = board.points.filter(
    (point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
  )

  const mostDistantPoint =
    player.direction === 'clockwise'
      ? occupiedPoints[occupiedPoints.length - 1]
      : occupiedPoints[0]
  return mostDistantPoint.position[player.direction]
}

export const getLastMove = (moves: NodotsMoves) =>
  moves.find((move) => move.to !== undefined)

export const getNextMove = (moves: NodotsMoves) =>
  moves.find((move) => move.from === undefined)

export const isReentering = (
  board: NodotsBoardStore,
  player: Player
): boolean => (board.bar[player.color].checkers.length > 0 ? true : false)

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

export const isMoveSane = (payload: NodotsMovePayload): boolean => {
  const { checker, origin, destination, state } = payload
  const { board, player } = state
  if (board.bar[player.color].checkers.length > 0 && origin.kind !== 'bar') {
    console.error(`${player.username} has checkers on the bar`)
    return false
  }

  if (
    destination &&
    destination.checkers &&
    destination.checkers.length > 1 &&
    destination.checkers[0].color !== checker.color
  ) {
    console.warn(`destination point occupied`)
    return false
  }

  if (checker.color !== player.color) {
    console.error(`Not ${player.username}'s checker`)
    return false
  }

  return true
}

export const isMoveHit = (payload: NodotsMovePayload): boolean => {
  const { checker, destination } = payload

  if (
    destination.checkers.length === 1 &&
    destination.checkers[0].color !== checker.color
  )
    return true

  return false
}

export const isBearOffing = (
  board: NodotsBoardStore,
  player: Player
): boolean => {
  const homeBoardPoints = board.points.filter(
    (point) => point.position[player.direction] <= 6
  )
  const homeBoardCheckerCount = homeBoardPoints
    .map((point) =>
      point.checkers.length > 0 && point.checkers[0].color === player.color
        ? point.checkers.length
        : 0
    )
    .reduce((a, b) => a + b, 0)

  const offCheckerCount = board.off[player.color].checkers.length
  const checkerCount = homeBoardCheckerCount + offCheckerCount + 1 // +1 to include checker in play
  return checkerCount === CHECKERS_PER_PLAYER ? true : false
}

export const resetGameState = () => localStorage.removeItem(gameStateKey)

export const saveGameState = (state: NodotsGameState) => {
  let gameStateResource = localStorage.getItem(gameStateKey)
  if (!gameStateResource) {
    console.warn('No gameStateResource')
    localStorage.setItem(gameStateKey, JSON.stringify([state]))
  } else {
    const gameStateResourceObjArray: NodotsGameState[] =
      JSON.parse(gameStateResource)
    gameStateResourceObjArray.push(state)
  }
}

// Refactor to eliminate undefineds and fix type issue with return
export const buildMoves = (
  roll: Roll,
  activePlayer: NodotsPlayer
): NodotsMoves => {
  const moves = [
    {
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[0],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    },
    {
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[1],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    },
  ]
  if (roll[0] === roll[1]) {
    moves.push({
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[0],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    })
    moves.push({
      checker: undefined,
      from: undefined,
      to: undefined,
      dieValue: roll[1],
      direction: activePlayer.direction,
      player: activePlayer,
      completed: false,
    })
  }
  // FIXME: TS compiler says that this must return 4 NodotsMoves, not 2 OR 4.
  // @ts-ignore
  return moves
}

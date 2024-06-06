import { MoveMovedSucceded, NodotsMovePayload } from '.'
import { generateTimestamp } from '..'
import { getPipCounts } from '../Board'
import { Point } from '../Checkercontainer'
import { MovingPlayer } from '../Player'

export const reenter = (payload: NodotsMovePayload): MoveMovedSucceded => {
  const { state, destination, origin, checker, move, players } = payload
  const { board, player } = state
  const reenteringPlayer = player as MovingPlayer // FIXME

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (originChecker) => originChecker.id !== checker.id
  ))
  const updatedOrigin = board.bar[checker.color]
  updatedOrigin.checkers = originCheckers

  const destinationCheckers = [...destination.checkers, checker]
  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point // FIXME
  updatedDestination.checkers = destinationCheckers

  move.from = updatedOrigin
  move.to = updatedDestination
  move.completed = true
  move.timestamp = generateTimestamp()

  const pipCounts = getPipCounts(board, players)
  players.black.pipCount = pipCounts.black
  players.white.pipCount = pipCounts.white

  return {
    ...state,
    kind: 'move-moved-succeded',
    move,
    checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
    player: reenteringPlayer,
    players,
  }
}

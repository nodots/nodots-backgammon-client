import { Mode } from '@mui/icons-material'
import { MoveMovedSucceded, MoveMoving, NodotsMovePayload } from '.'
import { getPipCounts } from '../../Board'
import { Point } from '../../Checkercontainer'
import { MovingPlayer } from '../../Player'
import { generateTimestamp } from '../..'

export const pointToPoint = (
  payload: NodotsMovePayload
): MoveMoving | MoveMovedSucceded => {
  const { state, checker, origin, destination, move, players } = payload
  const { board, player } = state

  const originCheckers = (origin.checkers = origin.checkers.filter(
    (originChecker) => originChecker.id !== checker.id
  ))

  const destinationCheckers = [...destination.checkers, checker]

  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const updatedDestination = board.points.find(
    (point) => point.id === destination.id
  ) as Point
  updatedDestination.checkers = destinationCheckers

  move.from = updatedOrigin
  move.to = updatedDestination
  move.status = true
  move.timestamp = generateTimestamp()

  const pipCounts = getPipCounts(board, players)
  players.black.pipCount = pipCounts.black
  players.white.pipCount = pipCounts.white

  return {
    ...state,
    kind: 'move-moved-succeded',
    player: player as MovingPlayer,
    move: move,
    checker,
    origin: updatedOrigin,
    destination: updatedDestination,
    board,
    players,
  }
}

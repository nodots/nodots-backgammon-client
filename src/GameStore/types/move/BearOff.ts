import { MoveMovedSucceded, MoveMoving, NodotsMovePayload } from '.'
import { generateTimestamp } from '..'
import { getPipCounts } from '../Board'
import { Point } from '../Checkercontainer'
import { MovingPlayer, WinningPlayer } from '../Player'

export const bearOff = (
  payload: NodotsMovePayload
): MoveMovedSucceded | MoveMoving => {
  const { state, checker, origin, destination, move, moves, players } = payload
  const { board, player } = state
  if (!move) {
    throw Error('No activeMove')
  }
  const originCheckers = origin.checkers.filter((c) => c.id !== checker.id)
  const updatedOrigin = board.points.find(
    (point) => point.id === origin.id
  ) as Point
  updatedOrigin.checkers = originCheckers

  const destinationCheckers = destination.checkers.concat(checker)
  const updatedDestination = board.off[player.color]
  updatedDestination.checkers = destinationCheckers

  move.from = updatedOrigin
  move.to = updatedDestination
  move.completed = true
  move.timestamp = generateTimestamp()

  const pipCounts = getPipCounts(board, players)
  players.black.pipCount = pipCounts.black
  players.white.pipCount = pipCounts.white

  return {
    kind: 'move-moved',
    move,
    // FIXME: Again, TS compiler is insisting there must be 4 moves in the array.
    //@ts-ignore
    moves,
    checker,
    board,
    player: player as MovingPlayer,
    origin: updatedOrigin,
    destination: updatedDestination,
    players,
  }
}

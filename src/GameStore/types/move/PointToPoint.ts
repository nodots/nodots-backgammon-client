import { NodotsMove } from '.'
import { NodotsBoardStore } from '../Board'
import { Checker } from '../Checker'
import { Point } from '../Checkercontainer'
import { Player } from '../Player'

export const pointToPoint = (
  board: NodotsBoardStore,
  player: Player,
  origin: Point,
  checker: Checker,
  move: NodotsMove
): NodotsBoardStore => {
  const originPosition = origin.position[player.moveDirection]
  const moveDelta = (move.dieValue as number) * -1
  const destinationPosition = originPosition + moveDelta
  if (destinationPosition < 0) {
    console.warn('Bear off in pointToPoint not yet supported')
  } else {
    const destination = board.points.find(
      (point) => point.position[player.moveDirection] === destinationPosition
    )
    move.from = origin
    move.to = destination
  }
  return board
}

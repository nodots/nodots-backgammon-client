import { NodotsMove } from '.'
import { NodotsBoardStore } from '../Board'

export const bearOff = (
  board: NodotsBoardStore,
  originId: string,
  checkerId: string,
  move: NodotsMove
): NodotsBoardStore => {
  const origin = board.points.find((point) => (point.id = originId))
  console.log('[bearOff] origin:', origin)
  console.log('[bearOff] move:', move)

  // if (!origin) throw Error(`No origin for id ${originId}`)
  // if (!destination) throw Error(`No destination for id ${destinationId}`)

  // const checkerToMove = origin.checkers.find(
  //   (checker) => checker.id === originId
  // )
  // if (!checkerToMove) throw Error(`No checker to move for id ${checkerId}`)

  // origin.checkers = origin.checkers.filter(
  //   (checker) => checker.id !== checkerToMove.id
  // )
  // destination.checkers.push(checkerToMove)
  return board
}

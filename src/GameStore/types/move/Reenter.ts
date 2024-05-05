import { NodotsBoardStore } from '../Board'

export const reenter = (
  store: NodotsBoardStore,
  originId: string,
  destinationId: string,
  checkerId: string
): NodotsBoardStore => {
  const origin = store.points.find((point) => (point.id = originId))
  const destination = store.points.find((point) => (point.id = destinationId))
  if (!origin) throw Error(`No origin for id ${originId}`)
  if (!destination) throw Error(`No destination for id ${destinationId}`)

  const checkerToMove = origin.checkers.find(
    (checker) => checker.id === originId
  )
  if (!checkerToMove) throw Error(`No checker to move for id ${checkerId}`)

  origin.checkers = origin.checkers.filter(
    (checker) => checker.id !== checkerToMove.id
  )
  destination.checkers.push(checkerToMove)
  return store
}

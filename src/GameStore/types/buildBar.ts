import { NodotsBoardImports, NodotsCheckercontainerImport, generateId } from '.'
import { generateCheckersForCheckercontainerId } from './Checker'
import { Bar } from './Checkercontainer'
import {
  NodotsPlayers,
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from './Player'

export const buildBar = (
  players: NodotsPlayers,
  boards: NodotsBoardImports
): { white: Bar; black: Bar } => {
  const clockwisePlayer = getClockwisePlayer(players)
  const counterclockwisePlayer = getCounterclockwisePlayer(players)

  const clockwiseBoard = boards.clockwise
  const counterclockwiseBoard = boards.counterclockwise

  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color

  clockwiseBoard.map((cc) => console.log(cc.position))

  const clockwiseBar = clockwiseBoard.find(
    (cc) => cc.position === 'bar'
  ) as unknown as NodotsCheckercontainerImport

  if (!clockwiseBar) {
    return {
      white: {
        id: generateId(),
        color: 'white',
        position: 'bar',
        kind: 'bar',
        checkers: [],
      },
      black: {
        id: generateId(),
        color: 'white',
        position: 'bar',
        kind: 'bar',
        checkers: [],
      },
    }
  }

  const counterclockwiseBar = counterclockwiseBoard.find(
    (cc) => cc.position === 'bar'
  ) as unknown as NodotsCheckercontainerImport

  const clockwiseId = generateId()
  const counterclockwiseId = generateId()

  const clockwiseCheckers = generateCheckersForCheckercontainerId(
    clockwiseColor,
    clockwiseId,
    clockwiseBar.checkercount
  )

  const counterclockwiseCheckers = generateCheckersForCheckercontainerId(
    counterclockwiseColor,
    counterclockwiseId,
    counterclockwiseBar.checkercount
  )

  if (clockwiseColor === 'black') {
    return {
      black: {
        id: clockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'black',
        checkers: clockwiseCheckers,
      },
      white: {
        id: counterclockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'white',
        checkers: counterclockwiseCheckers,
      },
    }
  } else {
    return {
      black: {
        id: counterclockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'black',
        checkers: counterclockwiseCheckers,
      },
      white: {
        id: clockwiseId,
        kind: 'bar',
        position: 'bar',
        color: 'white',
        checkers: clockwiseCheckers,
      },
    }
  }
}

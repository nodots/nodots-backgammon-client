import { Board, Latitude, Longitude } from './Board'
import { Checker } from './Checker'
import { Color } from '.'

export type Checkercontainer = {
  id: string
  kind: string
  checkers: Checker[]
}
export interface Point extends Checkercontainer {
  kind: 'point'
  position: {
    clockwise: number
    counterclockwise: number
  }
  latitude: Latitude
  longitude: Longitude
}

export interface Bar extends Checkercontainer {
  kind: 'bar'
  color: Color
}

export interface Off extends Checkercontainer {
  kind: 'off'
  color: Color
}
export const getCheckercontainers = (board: Board) => {
  const checkercontainers = [
    ...board.quadrants.east.north.points,
    ...board.quadrants.east.south.points,
    ...board.quadrants.west.north.points,
    ...board.quadrants.west.south.points,
    board.bar[0],
    board.bar[1],
    board.off[0],
    board.off[1],
  ]
  return checkercontainers
}

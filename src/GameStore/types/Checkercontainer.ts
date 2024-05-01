import {
  NodotsBoardStore,
  Latitude,
  Longitude,
  getCheckercontainers,
} from './Board'
import { Checker } from './Checker'
import { Color, PointPosition } from '.'

export type Checkercontainer = {
  id: string
  kind: string
  checkers: Checker[]
}

export interface Point extends Checkercontainer {
  kind: 'point'
  position: {
    clockwise: PointPosition
    counterclockwise: PointPosition
  }
}

export interface Bar extends Checkercontainer {
  kind: 'bar'
  color: Color
  position: 'bar'
}

export interface Off extends Checkercontainer {
  kind: 'off'
  color: Color
  position: 'off'
}

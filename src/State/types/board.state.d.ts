import { PointState } from './point.state'
import { OffState } from './off.state'
import { RailState } from './rail.state'



export type BoardState = {
  id: string,
  points: [
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
    PointState,
  ]
  off: [OffState, OffState]
  rail: [RailState, RailState]
}
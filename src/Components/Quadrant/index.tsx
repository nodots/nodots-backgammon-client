import {
  generateId,
  Confirming,
  Moving,
  Rolling,
  RollingForStart,
  Rolled,
} from '../../GameStore/types'
import {
  Longitude,
  Latitude,
  Points,
  NodotsBoardStore,
} from '../../GameStore/types/Board'
import { Point } from '../../GameStore/types/Checkercontainer'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { NodotsGameState } from '../../GameStore/types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  store: NodotsGameStore
  boardStore: NodotsBoardStore
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function Quadrant({ store, latitude, longitude, start, points }: Props) {
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <PointLabels latitude={latitude} longitude={longitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <PointComponent
            id={generateId()}
            store={store}
            checkers={p.checkers}
            position={p.position}
            latitude={latitude}
            key={generateId()}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Quadrant)

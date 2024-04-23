import {
  generateId,
  Confirming,
  Moving,
  Rolling,
  RollingForStart,
  Rolled,
} from '../../GameStore/types'
import { Longitude, Latitude, Points } from '../../GameStore/types/Board'
import { Point } from '../../GameStore/types/Checkercontainer'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { NodotsGameState } from '../../GameStore/types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

type QuadrantPoints = Array<Point>

interface Props {
  store: NodotsGameStore
  state: Confirming | Rolling | Rolled | RollingForStart | Moving
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function Quadrant({ store, state, latitude, longitude, start, points }: Props) {
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
            state={state}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Quadrant)

import {
  generateId,
  Confirming,
  Moving,
  Ready,
  Rolling,
  RollingForStart,
} from '../../GameStore/types'
import { Longitude, Latitude } from '../../GameStore/types/Board'
import { Point } from '../../GameStore/types/Checkercontainer'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { NodotsGameState } from '../../GameStore/types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

interface Props {
  store: NodotsGameStore
  state: Ready | Confirming | Rolling | RollingForStart | Moving
  latitude: Latitude
  longitude: Longitude
  start: number
  points: Point[]
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
            position={{
              clockwise: p.position.clockwise,
              counterclockwise: p.position.counterclockwise,
            }}
            checkers={p.checkers}
            latitude={p.latitude}
            longitude={p.longitude}
            key={generateId()}
            state={state}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Quadrant)

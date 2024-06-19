import { observer } from 'mobx-react'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { Point } from '../../../stores/Game/types/Checkercontainer'
import {
  Latitude,
  Longitude,
  NodotsBoard,
} from '../../../stores/Game/types/Board'
import { NodotsGame, generateId } from '../../../stores/Game/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  gameStore: NodotsGameStore
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function Quadrant({ gameStore, latitude, longitude, start, points }: Props) {
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <PointLabels latitude={latitude} longitude={longitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <PointComponent
            id={generateId()}
            gameStore={gameStore}
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

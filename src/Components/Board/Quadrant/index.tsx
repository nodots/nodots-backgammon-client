import { observer } from 'mobx-react'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { Point } from '../../../stores/Game/types/Checkercontainer'
import { NodotsGame } from '../../../stores/Game'
import { Latitude, Longitude } from '../../../stores/Game/types/Board'
import { generateId } from '../../../stores/Types'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  store: NodotsGame
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

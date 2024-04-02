import { Color, Longitude, PlayerBoard, generateId } from '../../game/Types'
import { Latitude, Point } from '../../game/Types'
import PointComponent from '../Point'
import { Props as PointProps } from '../Point'
import PointLabels from '../PointLabels'
import { NodotsGameState } from '../../game/Types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'

interface Props {
  latitude: Latitude
  longitude: Longitude
  start: number
  points: Point[]
  state: NodotsGameState
  store: NodotsGameStore
}

const Quadrant: React.FC<Props> = ({
  latitude,
  longitude,
  start,
  store,
  points,
}) => {
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <PointLabels latitude={latitude} longitude={longitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <PointComponent
            position={{
              clockwise: p.position.clockwise,
              counterclockwise: p.position.counterclockwise,
            }}
            checkers={p.checkers}
            latitude={p.latitude}
            longitude={p.longitude}
            key={generateId()}
            store={store}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Quadrant)

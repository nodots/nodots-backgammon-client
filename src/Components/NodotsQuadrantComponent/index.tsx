import { observer } from 'mobx-react'
import NodotsGameStore from '../../Hooks/GameStore'
import { generateId } from '../../Hooks/types'
import { Latitude, Longitude, NodotsBoardStore } from '../../Hooks/types/Board'
import { Point } from '../../Hooks/types/Checkercontainer'
import NodotsPointComponent from '../NodotsBoardComponent/NodotsPointComponent'
import NodotsPointLabelComponent from '../NodotsBoardComponent/NodotsPointLabelComponent'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  store: NodotsGameStore
  boardStore: NodotsBoardStore
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function NodotsQuadrantComponent({
  store,
  latitude,
  longitude,
  start,
  points,
}: Props) {
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <NodotsPointLabelComponent
        latitude={latitude}
        longitude={longitude}
        start={start}
      />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <NodotsPointComponent
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

export default observer(NodotsQuadrantComponent)

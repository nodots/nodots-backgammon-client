import NodotsPointLabelComponent from '../NodotsPointLabelComponent'
import NodotsPointComponent from '../NodotsPointComponent'
import {
  Latitude,
  Longitude,
  NodotsBoard,
  NodotsGameState,
  Point,
} from '../../../../nodots_modules/backgammon-types'
import { generateId } from '../../helpers'

// Why is this here? I think that Quadrant is purely a UI concept.
export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  board: NodotsBoard
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function NodotsQuadrantComponent({
  board,
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
            board={board}
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

export default NodotsQuadrantComponent

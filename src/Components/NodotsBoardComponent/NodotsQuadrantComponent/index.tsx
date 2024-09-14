import NodotsPointLabelComponent from '../NodotsPointLabelComponent'
import NodotsPointComponent from '../NodotsPointComponent'
import {
  Latitude,
  Longitude,
  NodotsBoard,
  NodotsGame,
  Point,
} from '../../../../nodots_modules/backgammon-types'
import { generateId } from '../../helpers'

// Why is this here? I think that Quadrant is purely a UI concept.
export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface Props {
  game: NodotsGame
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function NodotsQuadrantComponent({
  game,
  latitude,
  longitude,
  start,
  points,
}: Props) {
  const { board } = game
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
            game={game}
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

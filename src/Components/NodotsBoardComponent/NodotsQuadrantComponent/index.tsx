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
import { useEffect } from 'react'
import { start } from 'repl'

// Why is this here? I think that Quadrant is purely a UI concept.
export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

const getStartingPositionForLatitudeLongitude = (
  latitude: Latitude,
  longitude: Longitude
) => {
  if (latitude === 'north' && longitude === 'west') {
    return 19
  }
  if (latitude === 'north' && longitude === 'east') {
    return 13
  }
  if (latitude === 'south' && longitude === 'west') {
    return 1
  }
  if (latitude === 'south' && longitude === 'east') {
    return 7
  }
}

export const getPointsForLatitudeLongitude = (
  board: NodotsBoard,
  latitude: Latitude,
  longitude: Longitude
) => {
  const points: Point[] = []
  const startingPosition = getStartingPositionForLatitudeLongitude(
    latitude,
    longitude
  )
  if (!startingPosition) throw Error('No starting position')
  const endingPosition = startingPosition + 5
  console.log('[NodotsQuadrantComponent] startingPosition:', startingPosition)
  console.log('[NodotsQuadrantComponent] startingPosition:', endingPosition)
  board.points.forEach((p) => {
    if (
      p.position.clockwise >= startingPosition &&
      p.position.clockwise <= endingPosition
    ) {
      points.push(p)
    }
  })
  if (points.length !== 6) throw Error('Invalid number of points')
  const quadrantPoints: QuadrantPoints = points as QuadrantPoints
  return quadrantPoints
}
export interface Props {
  game: NodotsGame
  latitude: Latitude
  longitude: Longitude
  start: number
  // points: QuadrantPoints
}

const NodotsQuadrantComponent = ({
  game,
  latitude,
  longitude,
  start,
}: // points,
Props) => {
  console.log('[NodotsQuadrantComponent] game:', game)
  console.log('[NodotsQuadrantComponent] latitude:', latitude)
  console.log('[NodotsQuadrantComponent] longitude:', longitude)

  useEffect(() => {
    game.board && getPointsForLatitudeLongitude(game.board, latitude, longitude)
  }, [])
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <NodotsPointLabelComponent latitude={latitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {getPointsForLatitudeLongitude(game.board, latitude, longitude).map(
          (p) => (
            <NodotsPointComponent
              id={generateId()}
              game={game}
              checkers={p.checkers}
              position={p.position}
              latitude={latitude}
              key={generateId()}
            />
          )
        )}
      </div>
    </div>
  )
}

export default NodotsQuadrantComponent

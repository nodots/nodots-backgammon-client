import NodotsPointLabelComponent from '../NodotsPointLabelComponent'
import NodotsPointComponent from '../NodotsPointComponent'
import {
  Latitude,
  Longitude,
  NodotsBoard,
  NodotsGame,
  NodotsPlayer,
  Point,
} from '../../../../nodots_modules/backgammon-types'
import { generateId } from '../../helpers'
import { useEffect, useState } from 'react'
import { start } from 'repl'
import { Loading } from '../../utils/Loading'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

const getStartingPositionForLatitudeLongitude = (
  latitude: Latitude,
  longitude: Longitude
) => {
  if (latitude === 'north' && longitude === 'west') {
    return 13
  }
  if (latitude === 'north' && longitude === 'east') {
    return 19
  }
  if (latitude === 'south' && longitude === 'west') {
    return 7
  }
  if (latitude === 'south' && longitude === 'east') {
    return 1
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
  player: NodotsPlayer
  latitude: Latitude
  longitude: Longitude
  start: number
  // points: QuadrantPoints
}

const NodotsQuadrantComponent = ({
  game,
  player,
  latitude,
  longitude,
  start,
}: // points,
Props) => {
  const { board } = game
  const [points, setPoints] = useState<QuadrantPoints | undefined>(undefined)
  console.log('[NodotsQuadrantComponent] game:', game)
  console.log('[NodotsQuadrantComponent] player:', player)
  console.log('[NodotsQuadrantComponent] latitude:', latitude)
  console.log('[NodotsQuadrantComponent] longitude:', longitude)

  useEffect(() => {
    const ps = getPointsForLatitudeLongitude(board, latitude, longitude)
    setPoints(ps)
  }, [])

  return points ? (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <NodotsPointLabelComponent latitude={latitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((point) => (
          <NodotsPointComponent
            id={generateId()}
            key={point.id}
            game={game}
            position={point.position}
            latitude={latitude}
            checkers={point.checkers}
          />
        ))}
      </div>
    </div>
  ) : (
    <Loading message="Loading quadrant" />
  )
}

export default NodotsQuadrantComponent

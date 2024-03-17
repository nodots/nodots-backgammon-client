import { Board, Color, PlayerBoard, generateId } from '../../game/game'
import { Players } from '../../pages/game'
import Checker from '../Checker'
import Point from '../Point'
import { Props as PointProps } from '../Point'
import PointLabels from '../PointLabels'

type Latitude = 'north' | 'south'
type Longitude = 'east' | 'west'

interface Props {
  latitude: Latitude
  longitude: Longitude
  start: number
  board: Board
  players: Players
}

const buildPoints = (
  board: Board,
  start: number,
  players: Players,
  latitude: Latitude,
  longitude: Longitude
): PointProps[] => {
  const end = start + 6
  const points: PointProps[] = []
  const clockwisePlayer =
    players.white.moveDirection === 'clockwise' ? players.white : players.black

  const counterclockwisePlayer =
    players.white.moveDirection === 'counterclockwise'
      ? players.white
      : players.black

  const clockwiseBoard = board[clockwisePlayer.color]
  const counterclockwiseBoard = board[counterclockwisePlayer.color]
  const clockwiseColor = clockwisePlayer.color
  const counterclockwiseColor = counterclockwisePlayer.color

  for (const positionLabel in clockwiseBoard) {
    const checkerCount = clockwiseBoard[positionLabel as keyof PlayerBoard]
    const checkers: Color[] = []
    if (positionLabel !== 'bar') {
      const position: number = parseInt(positionLabel)
      const counterclockwisePosition = 25 - position
      if (position >= start && position < end) {
        for (let i = 0; i < checkerCount; i++) {
          checkers.push(clockwiseColor)
        }
        const p: PointProps = {
          position: {
            clockwise: position,
            counterclockwise: counterclockwisePosition,
          },
          longitude,
          latitude,
          checkers,
        }
        points.push(p)
      }
    }
  }

  for (const positionLabel in counterclockwiseBoard) {
    const checkerCount =
      counterclockwiseBoard[positionLabel as keyof PlayerBoard]
    const checkers: Color[] = []
    if (positionLabel !== 'bar') {
      const counterclockwisePosition: number = parseInt(positionLabel)
      const clockwisePosition = 25 - counterclockwisePosition
      if (clockwisePosition >= start && clockwisePosition < end) {
        for (let i = 0; i < checkerCount; i++) {
          checkers.push(counterclockwiseColor)
        }
        const existingPoint = points.find((p) => {
          // console.log(p.position.clockwise, clockwisePosition)
          if (p.position.clockwise === clockwisePosition) {
            return p
          }
        })
        if (existingPoint) {
          if (existingPoint.checkers.length > 0 && checkers.length > 0) {
            console.error(
              'Existing point already has checkers:',
              existingPoint.checkers
            )
          }
          const existingPointIndex = points.indexOf(existingPoint)
          points[existingPointIndex].checkers.push(...checkers)
        }
      }
    }
  }
  return points
}

const Quadrant: React.FC<Props> = ({
  latitude,
  longitude,
  start,
  board,
  players,
}) => {
  const points = buildPoints(board, start, players, latitude, longitude)

  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <PointLabels latitude={latitude} longitude={longitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <Point
            position={{
              clockwise: p.position.clockwise,
              counterclockwise: p.position.counterclockwise,
            }}
            checkers={p.checkers}
            latitude={p.latitude}
            longitude={p.longitude}
            key={generateId()}
          />
        ))}
      </div>
    </div>
  )
}

export default Quadrant

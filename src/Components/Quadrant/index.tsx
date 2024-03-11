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
  latitude: Latitude
): PointProps[] => {
  const end = start + 6
  const points: PointProps[] = []
  // console.log('placeCheckers board:', board)
  // console.log('placeCheckers players:', players)
  const clockwisePlayer =
    players.white.moveDirection === 'clockwise' ? players.white : players.black
  // console.log('placeCheckers clockwisePlayer:', clockwisePlayer)

  const counterclockwisePlayer =
    players.white.moveDirection === 'counterclockwise'
      ? players.white
      : players.black
  // console.log('placeCheckers counterclockwisePlayer:', counterclockwisePlayer)

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
      // positionClockwise: 25 - position,
      // positionCounterClockwise: position,

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
          // console.log(clockwisePosition)
          // console.log(existingPoint.position)
          if (existingPoint.checkers.length > 0 && checkers.length > 0) {
            console.error(
              'Existing point already has checkers:',
              existingPoint.checkers
            )
            console.error('New checkers for cc player:', checkers)
          }
          const existingPointIndex = points.indexOf(existingPoint)
          console.log(points[existingPointIndex].checkers)
          console.log(checkers)
          points[existingPointIndex].checkers.push(...checkers)
        }
      }
    }
  }
  console.log(points)
  return points
}

const Quadrant: React.FC<Props> = ({
  latitude,
  longitude,
  start,
  board,
  players,
}) => {
  const points = buildPoints(board, start, players, latitude)

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
            key={generateId()}
          />
        ))}
      </div>
    </div>
  )
}

export default Quadrant

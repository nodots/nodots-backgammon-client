import { ReactElement } from 'react'

interface Props {
  latitude: 'north' | 'south'
  longitude: 'east' | 'west'
  start: number
}

const getLabels = (start: number, latitude: 'north' | 'south') => {
  const labels: React.ReactElement[] = []
  for (let i = start; i < start + 6; i++) {
    labels.push(
      <div className="point-label" key={`label-${i}`}>
        {i}
      </div>
    )
  }
  return <>{labels}</>
}

const PointLabels: React.FC<Props> = ({ latitude, longitude, start }) => (
  <div className={`point-labels ${latitude}`}>{getLabels(start, latitude)}</div>
)

export default PointLabels

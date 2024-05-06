import { useTheme } from '@mui/material'
import { Latitude, Longitude } from '../../GameStore/types/Board'

interface Props {
  latitude: Latitude
  longitude: Longitude
  start: number
}

const getLabels = (start: number, latitude: Latitude) => {
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

const PointLabels: React.FC<Props> = ({ latitude, longitude, start }) => {
  const theme = useTheme()
  return (
    <div
      className={`point-labels ${latitude}`}
      style={{
        color: theme.palette.info.light,
        borderColor: theme.palette.info.light,
      }}
    >
      {getLabels(start, latitude)}
    </div>
  )
}

export default PointLabels

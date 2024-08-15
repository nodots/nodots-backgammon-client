import { useTheme } from '@mui/material'
import { Latitude, Longitude } from '../../../Hooks/types/Board'

interface Props {
  latitude: Latitude
  longitude: Longitude
  start: number
}

const getLabels = (start: number) => {
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

const NodotsPointLabelComponent: React.FC<Props> = ({
  latitude,
  longitude,
  start,
}) => {
  const theme = useTheme()
  return (
    <div
      className={`point-labels ${latitude}`}
      style={{
        color: theme.palette.info.light,
        borderColor: theme.palette.info.light,
      }}
    >
      {getLabels(start)}
    </div>
  )
}
// REMINDER: If we ever want to make these do something, needs
// to be an observer or use whatever other state mgmt we are using
// at that time
export default NodotsPointLabelComponent

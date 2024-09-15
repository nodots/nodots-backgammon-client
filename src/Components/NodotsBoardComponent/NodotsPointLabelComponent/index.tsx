import { useTheme } from '@mui/material'
import {
  Latitude,
  Longitude,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  latitude: Latitude
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
  console.log(labels)
  return <>{labels}</>
}

const NodotsPointLabelComponent: React.FC<Props> = ({ latitude, start }) => {
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

export default NodotsPointLabelComponent

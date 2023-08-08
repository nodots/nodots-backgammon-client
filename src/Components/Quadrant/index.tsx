import { Quadrant as QuadrantType, QuadrantLocation } from './state/types'
// Components
import Point from '../Point'
// UI
import { Grid } from '@mui/material'

interface QuadrantProps {
  location: QuadrantLocation
  locationString: string
  quadrant: QuadrantType
}

const Quadrant = (props: QuadrantProps) => {
  const classes = `quadrant ${props.locationString}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    points.push(<Point point={p} location={props.location} locationString={props.locationString} key={p.id} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
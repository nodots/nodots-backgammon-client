// Models
import { QuadrantLocation, Quadrant as QuadrantModel, generateId } from '../../models'
// Components
import Point from '../Point/Point'
// UI
import { Grid } from '@mui/material'

interface QuadrantProps {
  location: QuadrantLocation
  locationString: string
  quadrant: QuadrantModel
}

const Quadrant = (props: QuadrantProps) => {

  const classes = `quadrant ${props.locationString}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    points.push(<Point point={p} location={props.location} locationString={props.locationString} key={generateId()} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
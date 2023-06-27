import { Grid } from '@mui/material'
import { QuadrantLocation, Quadrant as QuadrantModel, generateId } from '../../Models/Backgammon'
import Point from '../Point/Point'

import './Quadrant.scss'

interface QuadrantProps {
  location: QuadrantLocation
  quadrant: QuadrantModel
}

const Quadrant = (props: QuadrantProps) => {
  const classes = `quadrant ${props.location}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    points.push(<Point point={p} location={props.location} key={generateId()} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
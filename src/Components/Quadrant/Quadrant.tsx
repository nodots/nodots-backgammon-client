import { Grid } from '@mui/material'
import { Quadrant as QuadrantModel } from '../../Models/Backgammon'
import Point from '../Point/Point'
import { Board, QuadrantLocation } from '../../Models/Backgammon'

import './Quadrant.scss'

interface QuadrantProps {
  location: QuadrantLocation
  quadrant: QuadrantModel
}

const Quadrant = (props: QuadrantProps) => {
  const classes = `quadrant ${props.location}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    points.push(<Point position={p.position} location={props.quadrant.location} checkers={p.currentCheckers} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
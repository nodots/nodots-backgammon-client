import { Grid } from '@mui/material'
import { Quadrant as QuadrantModel, generateId } from '../../Models/Backgammon'
import Point from '../Point/Point'
import { QuadrantLocation } from '../../Models/Backgammon'

import './Quadrant.scss'

interface QuadrantProps {
  location: QuadrantLocation
  quadrant: QuadrantModel
}

const Quadrant = (props: QuadrantProps) => {
  const classes = `quadrant ${props.location}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    if (p.position !== 'rail' && p.position !== 'off')
      points.push(<Point position={p.position} location={props.quadrant.location} checkers={p.checkers} key={generateId()} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
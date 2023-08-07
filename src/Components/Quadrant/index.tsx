// Models
// import { QuadrantLocation, Quadrant as QuadrantModel, generateId } from '../../models'
import { useBoard } from '../Board/state/useBoard'

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
  const { board } = useBoard()

  // const quadrant = Object.keys(board.quadrants).find(ql => ql === props.location.toString())
  const classes = `quadrant ${props.locationString}`
  const points: React.JSX.Element[] = []
  props.quadrant.points.forEach(p => {
    points.push(<Point point={p} location={props.location} locationString={props.locationString} key={props.quadrant.id} />)
  })
  return <Grid item className={classes}>
    {points}
  </Grid>
}

export default Quadrant
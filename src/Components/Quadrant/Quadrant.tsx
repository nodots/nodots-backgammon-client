import { Grid } from '@mui/material'
import { QuadrantLocation } from '../../Models/Backgammon'

import './Quadrant.scss'

interface QuadrantProps {
  location: QuadrantLocation
}

const Quadrant = (props: QuadrantProps) => {
  return <Grid item className='quadrant'>{props.location}</Grid>
}

export default Quadrant
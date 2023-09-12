import { Quadrant as QuadrantType, QuadrantLocation } from './state/types'
// Components
import Point from '../Point'
// UI
import { Box } from '@mui/material'

interface QuadrantProps {
  quadrantLocation: QuadrantLocation
  startingPosition: number
  quadrant: QuadrantType
}

const Quadrant = (props: QuadrantProps) => {
  const points: React.JSX.Element[] = []
  const orientation = QuadrantLocation[props.quadrantLocation].substring(0, 1) as 'N' | 'S'

  props.quadrant.points.forEach(p => {
    points.push(<Point point={p} quadrantLocation={props.quadrantLocation} position={p.position} key={p.id} />)
  })

  return <Box className='quadrant NW'>
    {points}
  </Box>
}


export default Quadrant


export const PointLabelContainer = (props: QuadrantProps) => {
  const labels: React.JSX.Element[] = []

  for (let i = props.startingPosition; i < props.startingPosition + 6; i++) {
    labels.push(<Box className='point-label' key={i}>{i}</Box>)
  }

  return <Box className={`point-labels ${QuadrantLocation[props.quadrantLocation]}`}>
    {labels}
  </Box>

}
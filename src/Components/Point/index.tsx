import { Box } from '@mui/material'
import { CheckerBox as CheckerBoxType } from '../CheckerBox/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'

import CheckerBox from '../CheckerBox'

interface PointProps {
  point: CheckerBoxType
  position: number
  quadrantLocation: QuadrantLocation
  backgroundColor: string
}

const Point = (props: PointProps) => {
  let className = 'point'
  props.quadrantLocation === QuadrantLocation.NW || props.quadrantLocation === QuadrantLocation.NE ?
    className += ' north' :
    className += ' south'

  className = props.position % 2 === 0 ?
    className += ' even' :
    className += ' odd'

  return <Box className={className}>
    <CheckerBox checkerBox={props.point} />
  </Box>
}

export default Point
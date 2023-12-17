import { Box } from '@mui/material'
import { Checkerbox as CheckerBoxType } from '../Checkerbox/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'
import Checkerbox from '../Checkerbox'

interface PointProps {
  point: CheckerBoxType
  position: number
  quadrantLocation: QuadrantLocation
  backgroundColor: string
}

const Point = (props: PointProps) => {
  let className = 'point'
  props.quadrantLocation === QuadrantLocation.NW ||
  props.quadrantLocation === QuadrantLocation.NE
    ? (className += ' north')
    : (className += ' south')

  className =
    props.position % 2 === 0 ? (className += ' even') : (className += ' odd')

  return (
    <Box className={className}>
      <Checkerbox checkerBox={props.point} />
    </Box>
  )
}

export default Point

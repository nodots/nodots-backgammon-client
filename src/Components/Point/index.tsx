import { Box } from '@mui/material'
import { CheckerBox as CheckerBoxType } from '../CheckerBox/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'

import CheckerBox from '../CheckerBox'

interface PointProps {
  point: CheckerBoxType
  position: number
  quadrantLocation: QuadrantLocation
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


// const Point = (props: PointProps) => {
//   let oddOrEven: string = ''
//   if (typeof props.point.position !== 'number') {
//     throw Error('Invalid position type')
//   }

//   oddOrEven = (props.point.position % 2) === 0 ? 'even' : 'odd'
//   const classes = `point ${props.locationString} ${oddOrEven}`
//   return <div className={classes} onDoubleClick={() => console.log(props.point)}>
//     <span className='point-position'>{props.point.position}</span>
//     <CheckerBox checkerBox={props.point} />
//   </div>
// }

export default Point
// Models
import { Point as PointModel, QuadrantLocation } from '../../Models'
// Components
import CheckerBox from '../CheckerBox/CheckerBox'

interface PointProps {
  point: PointModel
  location: QuadrantLocation
}

const Point = (props: PointProps) => {
  let oddOrEven: string = props.point.position % 2 === 0 ? 'even' : 'odd'
  const classes = `point ${props.location.toString()} ${oddOrEven}`

  return <div className={classes} onDoubleClick={() => console.log(props.point)}>
    <span className='point-position'>{props.point.position}</span>
    <CheckerBox checkerBox={props.point.checkerBox} />
  </div>
}

export default Point
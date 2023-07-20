import CheckerBox from '../CheckerBox/CheckerBox'
import { Point as PointModel, QuadrantLocation } from '../../Models'

interface PointProps {
  point: PointModel
  location: QuadrantLocation
}

const Point = (props: PointProps) => {
  let oddOrEven: string = props.point.position % 2 === 0 ? 'even' : 'odd'
  const classes = `point ${props.location.toString()} ${oddOrEven}`

  return <div className={classes} onDoubleClick={() => alert(props.point.id)}>
    <span className='point-position'>{props.point.position}</span>
    <CheckerBox checkerBox={props.point.checkerBox} />
  </div>
}

export default Point
import CheckerContainer from '../CheckerContainer/CheckerContainer'
import { CheckerContainer as CheckerContainerModel, Point as PointModel, QuadrantLocation, generateId } from '../../Models/Backgammon'

import './Point.scss'

interface PointProps {
  point: PointModel
  location: QuadrantLocation
}

const Point = (props: PointProps) => {
  let oddOrEven: string = props.point.position % 2 === 0 ? 'even' : 'odd'
  const classes = `point ${props.location.toString()} ${oddOrEven}`

  return <div className={classes} key={Math.random()}>
    <span className='point-position'>{props.point.position}</span>
    <CheckerContainer checkerContainer={props.point.checkerContainer} />
  </div>
}

export default Point
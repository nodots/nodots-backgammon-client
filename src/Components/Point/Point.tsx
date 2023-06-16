import Checker, { CheckerProps } from '../Checker/Checker'
import { QuadrantLocation } from '../../Models/Backgammon'
import './Point.scss'

interface PointProps {
  position: number
  location: QuadrantLocation
  checkers?: CheckerProps[]
  colorScheme?: string
}

const Point = (props: PointProps) => {
  const checkers = props.checkers ? props.checkers : []

  const classes = `point ${props.location}`

  const Checkers: React.JSX.Element[] = []
  if (checkers) {
    checkers.map(c =>
      Checkers.push(<Checker color={c.color} />)
    )
  }
  return <div className={classes} key={Math.random()}>
    <span>{props.position}</span>
    {Checkers}
  </div>
}

export default Point
import Checker, { CheckerProps } from '../Checker/Checker'
import { QuadrantLocation, generateId } from '../../Models/Backgammon'
import './Point.scss'

interface PointProps {
  position: number
  location: QuadrantLocation
  checkers?: CheckerProps[]
  colorScheme?: string
}

const Point = (props: PointProps) => {
  const checkers = props.checkers ? props.checkers : []
  let oddOrEven: string = props.position % 2 === 0 ? 'even' : 'odd'


  const classes = `point ${props.location} ${oddOrEven}`

  const Checkers: React.JSX.Element[] = []
  if (checkers) {
    checkers.map(c =>
      Checkers.push(<Checker color={c.color} key={generateId()} />)
    )
  }
  return <div className={classes} key={Math.random()}>
    <span>{props.position}</span>
    {Checkers}
  </div>
}

export default Point
import { Color, generateId } from '../../Models/Backgammon'
import './Checker.scss'

export interface CheckerProps {
  color: Color
  colorScheme?: string
}

const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.color}`
  return <div className={classes} key={generateId()}></div>
}

export default Checker
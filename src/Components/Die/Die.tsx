import { Color } from '../../Models/Backgammon'
import './Die.scss'

interface DieProps {
  color: Color
  value?: number
}

const Die = (props: DieProps) => {
  let value = 1
  if (props.value) {
    value = props.value
  }
  return <div className={`die ${props.color.toString()}`}>{value}</div>
}

export default Die
import { Color, generateId } from '../../Models/Backgammon'
import './Checker.scss'

export interface CheckerProps {
  color: Color
  colorScheme?: string
}


const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.color}`

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    alert(`move checker ${props.color}`)
  }
  return <div className={classes} key={generateId()} onClick={clickHandler}></div>
}

export default Checker
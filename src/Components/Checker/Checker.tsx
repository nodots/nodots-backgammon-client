import { Checker as CheckerModel, generateId } from '../../Models/Backgammon'
import './Checker.scss'

export interface CheckerProps {
  checker: CheckerModel
}


const Checker = (props: CheckerProps) => {
  const classes = `checker ${props.checker.color}`

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    alert(`move checker ${props.checker.id}`)
  }
  return <div className={classes} key={generateId()} onClick={clickHandler}></div>
}

export default Checker
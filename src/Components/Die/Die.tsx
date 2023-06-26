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
  let pips = ''
  switch (value) {
    case 1:
      pips = '*'
      break
    case 2:
      pips = '**'
      break
    case 3:
      pips = '***'
      break
    case 4:
      pips = '**\n**'
      break
    case 5:
      pips = '**\n*\n**'
      break
    case 6:
      pips = '***\n***'
      break
    default:
      throw Error('Invalid pips for die')
  }

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    alert(`switch dice for ${props.color}`)
    e.stopPropagation()
  }

  return <div className={`die ${props.color.toString()}`} onClick={clickHandler}>{pips}</div>
}

export default Die
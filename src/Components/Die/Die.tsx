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
  let valueClass = ''
  switch (value) {
    case 1:
      valueClass = 'one'
      break
    case 2:
      valueClass = 'two'
      break
    case 3:
      valueClass = 'three'
      break
    case 4:
      valueClass = 'four'
      break
    case 5:
      valueClass = 'five'
      break
    case 6:
      valueClass = 'six'
      break
    default:
      throw Error('Invalid pips for die')
  }

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    alert(`switch dice for ${props.color}`)
    e.stopPropagation()
  }

  return <div className={`die ${props.color.toString()} ${valueClass}`} onClick={clickHandler}>{props.value?.toString()}</div>
}

export default Die
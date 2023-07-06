import { Color, DieValue } from '../../Models'

interface DieProps {
  color: Color
  value?: DieValue
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

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Switching dice not yet implemented')
  }

  return <div className={`die ${props.color.toString()} ${valueClass}`} onClick={clickHandler}></div>
}

export default Die
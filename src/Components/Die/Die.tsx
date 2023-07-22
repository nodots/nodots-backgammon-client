import { useGame } from '../../State'
import { Color, DieValue } from '../../Models'

interface DieProps {
  order: number,
  color: Color
  value?: DieValue
}

const Die = (props: DieProps) => {
  const { name, rename } = useGame()
  // console.log(`[DIE] COMPONENT diceState:`, diceState)
  // console.log(`[DIE] COMPONENT diceState[${props.order}].value:`, diceState[props.order].value)
  const value = props.value || 1 as DieValue

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

  }

  return <div className={`die ${props.color.toString()} ${valueClass}`} onClick={clickHandler}></div>
}

export default Die
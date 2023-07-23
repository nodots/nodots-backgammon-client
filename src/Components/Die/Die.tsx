import { useGame } from '../../State/Game.State'
import { GameError, Die as DieModel, DieValue } from '../../Models'

interface DieProps {
  die: DieModel
}

const Die = (props: DieProps) => {
  const { activeColor } = useGame()
  const value = props.die.value || 1 as DieValue

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
      throw new GameError({ model: 'Die', errorMessage: 'Invalid pips for die' })
  }

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {

  }

  let classes = `die ${props.die.color.toString()} ${valueClass}`
  if (props.die.color === activeColor) {
    return <div className={classes} onClick={clickHandler}></div>
  } else {
    return <></>
  }


}

export default Die
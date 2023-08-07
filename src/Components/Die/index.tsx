import { useState, useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import { Color, GameError } from '../../models'
import { DieOrder, DieValue } from './state/types'

interface DieProps {
  order: DieOrder
  color: Color
  value: DieValue | undefined
}

const Die = (props: DieProps) => {
  const { activeColor } = useGame()
  const [valueClass, setValueClass] = useState<string>('one')

  useEffect(() => {
    switch (props.value) {
      case 1:
        setValueClass('one')
        break
      case 2:
        setValueClass('two')
        break
      case 3:
        setValueClass('three')
        break
      case 4:
        setValueClass('four')
        break
      case 5:
        setValueClass('five')
        break
      case 6:
        setValueClass('six')
        break
      default:
        throw new GameError({ model: 'Die', errorMessage: `Invalid pips for die ${props.value}` })
    }

  }, [props.value])


  let classes = `die ${props.color.toString()} ${valueClass}`
  if (props.color === activeColor) {
    return <div className={classes}></div>
  } else {
    return <></>
  }


}

export default Die




// switch (newValue) {
//   case 1:
//     setValueClass('one')
//     break
//   case 2:
//     setValueClass('two')
//     break
//   case 3:
//     setValueClass('three')
//     break
//   case 4:
//     setValueClass('four')
//     break
//   case 5:
//     setValueClass('five')
//     break
//   case 6:
//     setValueClass('six')
//     break
//   default:
//     throw new GameError({ model: 'Die', errorMessage: `Invalid pips for die ${dieValue}` })
// }

// return newValue
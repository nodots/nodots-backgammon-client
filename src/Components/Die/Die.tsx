import { forwardRef, useState, useImperativeHandle } from 'react'
import { useGame, DieState } from '../../State/Game.State'
import { GameError, DieValue, Color } from '../../Models'

interface DieProps {
  die: DieState
}

const Die = forwardRef((props: DieProps, ref) => {
  const { activeColor, dice, roll } = useGame()
  const dieState = dice[props.die.color][props.die.order]
  const [dieValue, setDieValue] = useState<DieValue>(dieState.value)
  const [valueClass, setValueClass] = useState<string>('one')

  useImperativeHandle(ref, () => ({
    rollDie () {
      console.log(`[Die Component]: rollDie()`)
      roll(props.die.color, props.die.order)
      console.log('[Die Component] dieState.value:', dieState.value)
      setDieValue(dieState.value)
      switch (dieState.value) {
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
          throw new GameError({ model: 'Die', errorMessage: `Invalid pips for die ${dieValue}` })
      }
    }

  }))

  let classes = `die ${props.die.color.toString()} ${valueClass}`
  if (props.die.color === activeColor) {
    return <div className={classes}></div>
  } else {
    return <></>
  }


})

export default Die
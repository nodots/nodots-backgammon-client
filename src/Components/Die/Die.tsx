// Hooks
import { forwardRef, useState, useImperativeHandle } from 'react'
import { useGame } from '../../hooks/useGame'
// Models
import { GameError, DieValue, Die as DieModel } from '../../Models'
// State
import { DieState } from '../../State/types/die-state'
import { DieRollActionPayload } from '../../State/types/game-action'

interface DieProps {
  die: DieState
}

const Die = forwardRef((props: DieProps, ref) => {
  const { activeColor, dice, roll, debug } = useGame()
  const dieState = dice[props.die.color][props.die.order]
  const [dieValue, setDieValue] = useState<DieValue | undefined>(dieState.value)
  const [valueClass, setValueClass] = useState<string>('one')

  useImperativeHandle(ref, () => ({
    rollDie (): DieValue {
      if (debug) {
        console.log(`[Die Component]: rollDie()`)
      }
      if (debug) {
        console.log('[Die Component] dieState.value:', dieState.value)
      }

      const newValue = DieModel.roll()
      // const newValue = 1 as DieValue
      setDieValue(newValue)

      if (!props.die.color) {
        throw new GameError({ model: 'Die', errorMessage: `Missing props ${JSON.stringify(props.die)}` })
      }

      const dieRollActionPayload: DieRollActionPayload = {
        color: props.die.color,
        order: props.die.order,
        value: newValue
      }

      roll(dieRollActionPayload)

      switch (newValue) {
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

      return newValue
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
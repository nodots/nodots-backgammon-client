import { forwardRef, useState, useImperativeHandle } from 'react'
import { useGame, DieState, DieRollPayload, GAME_ACTION_TYPE, GameAction } from '../../State/Game.State'
import { GameError, DieValue, Die as DieModel } from '../../Models'

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
      setDieValue(newValue)

      const dieRollAction: GameAction = {
        type: GAME_ACTION_TYPE.ROLL,
        payload: { color: props.die.color, order: props.die.order, value: newValue }
      }

      roll(dieRollAction)

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
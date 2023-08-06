import { useState } from 'react'
import { Color } from '../../models'
import { SetDiceValuesPayload } from '../../state/dice/dice.context'
import { DieValue, roll } from '../../state/dice/types'
import { useDice } from '../../state/dice/useDice'
import Die from '../Die/Die'

interface RollSurfaceProps {
  color: Color
}

const sdv = (setDiceValuesPayload: SetDiceValuesPayload) => {
  console.log(setDiceValuesPayload)
}

const RollSurface = (props: RollSurfaceProps) => {
  const { dice, setDiceValues } = useDice()
  console.log(dice)
  const [die1Value, setDie1Value] = useState<DieValue>(1)
  const [die2Value, setDie2Value] = useState<DieValue>(1)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    const newValues = [roll(), roll()]
    console.log('[RollSurface Component] clickHandler newValues:', newValues)

    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: props.color,
      values: {
        die1: newValues[0],
        die2: newValues[1]
      }
    }
    setDie1Value(newValues[0])
    setDie2Value(newValues[1])
    // console.log('[RollSurface Component] calling setDiceValues', setDiceValuesPayload)

    setDiceValues(setDiceValuesPayload)

  }

  return (
    <div className='roll-surface' onClick={clickHandler}>
      <Die order={0} value={die1Value} color={props.color} />
      <Die order={1} value={die2Value} color={props.color} />

    </div>
  )

}

export default RollSurface
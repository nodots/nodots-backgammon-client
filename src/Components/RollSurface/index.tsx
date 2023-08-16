import { useGame } from '../../game/useGame'
import { useState } from 'react'

import { Color, isColor } from '../../game'
import { GameError } from '../../game'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { DieValue, Roll, roll } from '../Die/state/types'
import Die from '../Die'
import { TurnStatus } from '../Player/state/types'
import { TurnActionPayload } from '../Player/state/reducers/turn'

interface RollSurfaceProps {
  color: Color
}

const RollSurface = (props: RollSurfaceProps) => {
  const { game, initializeTurn, finalizeTurn, setDiceValues } = useGame()
  const activeTurn = game.activeTurn
  const [die1Value, setDie1Value] = useState<DieValue>(1)
  const [die2Value, setDie2Value] = useState<DieValue>(1)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (activeTurn?.status === TurnStatus.AWAITING_FINALIZATION) {
      console.log('finalize')
    } else {
      const newRollValues = [roll(), roll()]
      console.log('[RollSurface Component] clickHandler newValues:', newRollValues)

      const setDiceValuesPayload: SetDiceValuesPayload = {
        color: props.color,
        values: {
          die1: newRollValues[0],
          die2: newRollValues[1]
        }
      }
      setDie1Value(newRollValues[0])
      setDie2Value(newRollValues[1])
      setDiceValues(setDiceValuesPayload)
      if (!activeTurn.status) {
        console.log('RollSurface Component] clickHandler Preparing to initialize turn')
        if (!isColor(game.activeColor)) {
          throw new GameError({
            model: 'Game',
            errorMessage: `Invalid activeColor ${game.activeColor}`
          })
        }
        const turn: TurnActionPayload = {
          player: game.players[game.activeColor],
          roll: [newRollValues[0], newRollValues[1]],
          status: TurnStatus.INITIALIZED,
        }

        initializeTurn(turn)

      }
    }

  }

  return (
    <div className='roll-surface' onClick={clickHandler}>
      {game.activeColor && game.activeColor === props.color && <>
        <Die order={0} value={die1Value} color={props.color} />
        <Die order={1} value={die2Value} color={props.color} />
      </>}
    </div>
  )
}
export default RollSurface

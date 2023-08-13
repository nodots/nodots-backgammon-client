import { useGame } from '../../game/useGame'
import { useState } from 'react'
import { Color } from '../../game'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { DieValue, roll } from '../Die/state/types'
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
    if (!game.activeColor) {
      throw new Error('No Active Color')
    }

    console.log(game.activeTurn)

    if (game.activeTurn.moves.length > 0 &&
      game.activeTurn.moves[game.activeTurn.moves.length - 1].destination &&
      game.activeTurn.moves[game.activeTurn.moves.length - 1].origin
    ) {
      console.log('[RollSurface Component] finalizeTurn')
      finalizeTurn()
    } else {
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
      if (!activeTurn.status) {
        console.log('RollSurface Component] clickHandler Preparing to initialize turn')
        const turn: TurnActionPayload = {
          player: game.players[game.activeColor],
          roll: [newValues[0], newValues[1]],
          status: TurnStatus.INITIALIZED,
        }
        initializeTurn(turn)
      }

      setDiceValues(setDiceValuesPayload)

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
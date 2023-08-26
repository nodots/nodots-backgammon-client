// Hooks
import { useGame } from '../../game/useGame'
import { useState } from 'react'
// Types
import { Die as DieType } from '../Die/state/types'
import { Color, isColor } from '../../game'
import { GameError } from '../../game'
import { SetDiceValuesPayload } from '../Die/state/dice.context'
import { DieValue, roll } from '../Die/state/types'
import { TurnStatus } from '../../game/turn'
import { TurnActionPayload } from '../../game/turn.reducer'
// Components
import Die from '../Die'
import { MoveStatus } from '../CheckerBox/state'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

interface RollSurfaceProps {
  color: Color
}

const RollSurface = (props: RollSurfaceProps) => {
  const { game, initializeTurn, finalizeTurn, setDiceValues } = useGame()
  const activeTurn = game.activeTurn
  let die1: DieType | undefined = undefined
  let die2: DieType | undefined = undefined

  if (game.activeColor) {
    die1 = game.dice[game.activeColor].dice[0]
    die2 = game.dice[game.activeColor].dice[1]
  }

  const [die1Value, setDie1Value] = useState<DieValue>(die1?.value ? die1.value : 1)
  const [die2Value, setDie2Value] = useState<DieValue>(die2?.value ? die2.value : 1)

  const swapDiceHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isColor(game.activeColor)) {
      if (game.dice[game.activeColor].dice[0].value === undefined ||
        game.dice[game.activeColor].dice[1].value === undefined
      ) {
        // e.stopPropagation()
        return console.error('Dice are not set yet')
      }
    }

    setDie1Value(die2Value)
    setDie2Value(die1Value)

    const setDiceValuesPayload: SetDiceValuesPayload = {
      color: props.color,
      values: {
        die1: die2Value,
        die2: die1Value
      }
    }
    setDiceValues(setDiceValuesPayload)
    e.stopPropagation()
  }

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (game.activeColor !== props.color) {
      console.error('Not your turn')
    }

    let isTurnComplete = false
    const lastMove = activeTurn.moves[activeTurn.moves.length - 1]

    if ((lastMove && lastMove.origin && lastMove.destination) || (lastMove && lastMove.status === MoveStatus.NO_MOVE)) {
      isTurnComplete = true
    }

    let isTurnInProgress = false
    if (activeTurn.moves.length > 0) {
      isTurnInProgress = true
    }

    /* TODO: Think about whether we want this logic here.
      PROS:
        - Easy check that prevents waiting for response 
        from reducer. Probably not that big a deal.
      CONS:
        - Logic in two places. It has to be in the reducer, it's
        a nice-to-have (maybe) here.
    */
    if (isTurnComplete) {
      finalizeTurn()
    } else if (isTurnInProgress) {
      console.error('Turn in progress')
      // noop
    } else {
      // const newRollValues = [roll(), roll()]
      const newRollValues = [6 as DieValue, 5 as DieValue]
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
          board: game.board,
          player: game.players[game.activeColor],
          roll: [newRollValues[0], newRollValues[1]],
          status: TurnStatus.INITIALIZED,
        }
        console.warn('[TRACE] calling initializeTurn with TurnActionPayload:', turn)
        const turnResult = initializeTurn(turn)
        console.warn('[TRACE] initializingTurn returned turnResult:', turnResult)

      }
    }
  }

  return (
    <div className='roll-surface' onClick={clickHandler}>
      {game.activeColor && game.activeColor === props.color && <>
        <Die order={0} value={die1Value} color={props.color} />
        <SyncAltIcon onClick={swapDiceHandler} sx={{ color: '#006b5f' }} />
        <Die order={1} value={die2Value} color={props.color} />
      </>}
    </div>
  )
}

export default RollSurface

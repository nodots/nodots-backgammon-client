// Hooks
import { useRef } from 'react'
import { useGame } from '../../hooks/useGame'
// Models
import { GameError } from '../../models'
// States
import { RollSurfaceState, DieState } from '../../state/types/die.state'
// Components
import Die from '../Die/Die'
import { InitializeTurnActionPayload } from '../../state/Game.context'
import { MoveStatus } from '../../models/Move'
import { TurnStatus } from '../../models/Turn'

interface RollSurfaceProps {
  rollSurface: RollSurfaceState
}


const RollSurface = (props: RollSurfaceProps) => {
  const die1Ref = useRef<DieState>(null)
  const die2Ref = useRef<DieState>(null)
  const { players, dice, activeColor, activeTurn, debug, rollSurfaces } = useGame()
  const die1State = dice[props.rollSurface.color][0] as DieState
  const die2State = dice[props.rollSurface.color][1] as DieState
  const rollSurfaceState = rollSurfaces[props.rollSurface.color]
  const activePlayer = players[props.rollSurface.color]

  const rollDice = async (): Promise<void> => {
    if (!die1Ref.current?.value || !die2Ref.current?.value) {
      throw new GameError({ model: 'Turn', errorMessage: 'No dice values' })
    }
    await die1Ref.current.rollDie()
    await die2Ref.current.rollDie()
  }

  if (debug) {
    console.log('[RollSurface Component dice:', dice)
    console.log('[RollSurface Component] activeColor:', activeColor)
    console.log('[RollSurface Component] players.black.active:', players.black.active)
    console.log('[RollSurface Component] players.white.active:', players.white.active)
    console.log('[RollSurface Component] rollSurfaceState:', rollSurfaceState)
    console.log('[RollSurface Component] die1State:', die1State)
    console.log('[RollSurface Component] die2State:', die2State)
  }

  const clickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (debug) {
      console.log(`[RollSurface Component] clickHandler activeTurn:`, activeTurn)
    }

    if (!activePlayer || activePlayer.color !== activeColor) {
      throw new GameError({ model: 'Move', errorMessage: 'There is either no active player or activePlayer and activeColor are out of sync' })
    }

    if (activeTurn.status === TurnStatus.DESTINATION_SET) {
      activeTurn.moves.forEach(m => {
        if (m.status !== MoveStatus.COMPLETED) {
          throw new GameError({ model: 'Move', errorMessage: 'One or more moves have not been completed' })
        }
      })
      // finalizeTurn(activeColor)
    } else {
      console.log('[Roll Surface Component] activeTurn:', activeTurn)
      if (debug) {
        console.log('[RollSurface Component] die1Ref', die1Ref)
        console.log('[RollSurface Component] die2Ref', die2Ref)
      }
      if (!die1Ref.current || !die2Ref.current) {
        throw new GameError({ model: 'RollSurface', errorMessage: 'Missing one or more Die' })
      }

      rollDice()
        .then(() => {
          console.log(dice)
          const payload: InitializeTurnActionPayload = {
            player: activePlayer,
          }
          // initializeTurn(payload)

        })

    }
  }

  return <div className='roll-surface' onClick={clickHandler}>
    <Die die={die1State} ref={die1Ref} />
    <Die die={die2State} ref={die2Ref} />
  </div >
}

export default RollSurface
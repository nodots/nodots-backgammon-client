// Hooks
import { useRef } from 'react'
import { useGame } from '../../hooks/useGame'
// Models
import { GameError } from '../../models'
// States
import { MOVE_STATUS } from '../../state/game.state'
import { RollSurfaceState, DieState } from '../../state/types/die.state'
// Components
import Die from '../Die/Die'

interface RollSurfaceProps {
  rollSurface: RollSurfaceState
}

const RollSurface = (props: RollSurfaceProps) => {
  const die1Ref = useRef<DieState>(null)
  const die2Ref = useRef<DieState>(null)
  const { players, dice, activeColor, activeTurn, debug, rollSurfaces, finalizeMove } = useGame()
  const die1State = dice[props.rollSurface.color][0] as DieState
  const die2State = dice[props.rollSurface.color][1] as DieState
  const rollSurfaceState = rollSurfaces[props.rollSurface.color]

  if (debug) {
    console.log('[RollSurface Component dice:', dice)
    console.log('[RollSurface Component] activeColor:', activeColor)
    console.log('[RollSurface Component] players.black.active:', players.black.active)
    console.log('[RollSurface Component] players.white.active:', players.white.active)
    console.log('[RollSurface Component] rollSurfaceState:', rollSurfaceState)
    console.log('[RollSurface Component] die1State:', die1State)
    console.log('[RollSurface Component] die2State:', die2State)
  }

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (debug) {
      console.log(`[RollSurface Component] clickHandler activeTurn:`, activeTurn)
    }

    if (activeTurn.status === MOVE_STATUS.DESTINATION_SET && activeTurn.color === props.rollSurface.color) {
      activeTurn.moves.forEach(m => {
        if (!m.completed) {
          throw new GameError({ model: 'Move', errorMessage: 'One or more moves have not been completed' })
        }
      })
      finalizeMove(activeColor)
    } else {
      console.log('[Roll Surface Component] activeTurn:', activeTurn)
      if (debug) {
        console.log('[RollSurface Component] die1Ref', die1Ref)
        console.log('[RollSurface Component] die2Ref', die2Ref)
      }
      if (!die1Ref.current || !die2Ref.current) {
        throw new GameError({ model: 'RollSurface', errorMessage: 'Missing one or more Die' })
      }
      die1Ref.current.rollDie()
      die2Ref.current.rollDie()

    }
  }


  return <div className='roll-surface' onClick={clickHandler}>
    <Die die={die1State} ref={die1Ref} />
    <Die die={die2State} ref={die2Ref} />
  </div >
}

export default RollSurface
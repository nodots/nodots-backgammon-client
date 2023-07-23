import { useRef } from 'react'
import { GameError } from '../../Models'
import { useGame, RollSurfaceState, DieState } from '../../State/Game.State'
import Die from '../Die/Die'

// TODO: RollSurface Component has no corresponding Model. Is that indicative of a problem?
interface RollSurfaceProps {
  rollSurface: RollSurfaceState
}

const RollSurface = (props: RollSurfaceProps) => {
  const die1Ref = useRef<DieState>(null)
  const die2Ref = useRef<DieState>(null)
  const { players, dice, activeColor, activeMove, debug, rollSurfaces, finalizeMove } = useGame()
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
      console.log(`[RollSurface Component] clickHandler activeMove:`, activeMove)
    }
    if (activeMove && activeMove.checkers[0].origin && activeMove.checkers[0].destination && activeMove.checkers[0].origin && activeMove.checkers[1].destination) {
      finalizeMove(activeColor)
    } else {
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
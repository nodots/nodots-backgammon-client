import { useRef } from 'react'
import { GameError } from '../../Models'
import { GAME_ACTION_TYPE } from '../../State/Game.state'
import { useGame } from '../../Hooks/useGame'
import { GameAction } from '../../State/types/game-action'
import { RollSurfaceState, DieState } from '../../State/types/die-state'
import Die from '../Die/Die'

// TODO: RollSurface Component has no corresponding Model. Is that indicative of a problem?
interface RollSurfaceProps {
  rollSurface: RollSurfaceState
}

const RollSurface = (props: RollSurfaceProps) => {
  const die1Ref = useRef<DieState>(null)
  const die2Ref = useRef<DieState>(null)
  const { players, dice, activeColor, activeMove, roll, debug, rollSurfaces, finalizeMove } = useGame()
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
      const die1Value = die1Ref.current.rollDie()
      const die2Value = die2Ref.current.rollDie()

      const payload: GameAction = {
        type: GAME_ACTION_TYPE.ROLL,
        payload: [
          { color: props.rollSurface.color, order: 0, value: die1Value },
          { color: props.rollSurface.color, order: 1, value: die2Value },
        ]

      }
      console.log(payload)
      // roll(payload)
    }
  }


  return <div className='roll-surface' onClick={clickHandler}>
    <Die die={die1State} ref={die1Ref} />
    <Die die={die2State} ref={die2Ref} />
  </div >
}

export default RollSurface
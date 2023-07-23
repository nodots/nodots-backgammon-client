import { useGame } from '../../State/Game.State'
import { useEffect, useState } from 'react'
import { Die as DieModel, RollSurface as RollSurfaceModel, Player } from '../../Models'
import Die from '../Die/Die'

// TODO: RollSurface Component has no corresponding Model. Is that indicative of a problem?
interface RollSurfaceProps {
  rollSurface: RollSurfaceModel
}

const RollSurface = (props: RollSurfaceProps) => {
  console.log('RollSurface props', props)
  const { players, activeColor, activeMove, debug, rollSurfaces, roll, finalizeMove } = useGame()
  const diceState = players[props.rollSurface.color].dice
  const rollSurfaceState = rollSurfaces[props.rollSurface.color]
  const dice: React.JSX.Element[] = []

  if (debug) {
    console.log('[RollSurface Component] activeColor:', activeColor)
    console.log('[RollSurface Component] players.black.active:', players.black.active)
    console.log('[RollSurface Component] players.white.active:', players.white.active)
    console.log('[RollSurface Component] rollSurfaceState:', rollSurfaceState)
    console.log('[RollSurface Component] diceState:', diceState)
  }


  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (debug) {
      console.log(`[RollSurface Component] clickHandler activeMove:`)
      console.log('[RollSurface Component]', activeMove)
    }
    if (activeMove && activeMove.checkers[0].origin && activeMove.checkers[0].destination && activeMove.checkers[0].origin && activeMove.checkers[1].destination) {
      finalizeMove(activeColor)
    } else {
      roll(activeColor)
    }
  }

  diceState.forEach((d: DieModel) => {
    dice.push(<Die die={d} />)
  })

  return <div className='roll-surface' onClick={clickHandler}>
    {dice}
  </div >
}

export default RollSurface
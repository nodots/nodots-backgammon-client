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
  const rollSurfaceState = rollSurfaces[props.rollSurface.color]
  const [isRollForStart, setIsRollForStart] = useState<boolean>(false)
  const dice: React.JSX.Element[] = []

  if (debug) {
    console.log('[RollSurface Component] activeColor:', activeColor)
    console.log('[RollSurface Component] players.black.active:', players.black.active)
    console.log('[RollSurface Component] players.white.active:', players.white.active)

  }

  // FIXME: This is a mess . . .
  useEffect(() => {
    if (!players.white.active && !players.black.active) {
      setIsRollForStart(true)
    }
  }, [players])


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

  rollSurfaceState.dice.forEach((d: DieModel) => {
    dice.push(<Die die={d} />)
  })

  return <div className='roll-surface' onClick={clickHandler}>
    {dice}
  </div >
}

export default RollSurface
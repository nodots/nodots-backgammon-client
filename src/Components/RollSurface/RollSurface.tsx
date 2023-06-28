import { useState } from 'react'
import { Player, DieValue } from '../../Models/Backgammon'
import Die from '../Die/Die'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {
  const [dieOne, setDieOne] = useState<DieValue>(1)
  const [dieTwo, setDieTwo] = useState<DieValue>(1)

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const rollResults: [DieValue, DieValue] = props.player.roll()
    setDieOne(rollResults[0])
    setDieTwo(rollResults[1])
  }

  return <div className='roll-surface' onClick={clickHandler} >
    <Die color={props.player.color} value={dieOne} />
    <Die color={props.player.color} value={dieTwo} />
  </div>
}

export default RollSurface
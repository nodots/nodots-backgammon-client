import { Player } from '../../Models/Backgammon'
import Die from '../Die/Die'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {
  // FIXME: Click handler not working
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(`Roll dice for ${props.player.color.toString()}`)
  }

  return <div className='roll-surface' onClick={clickHandler}>
    <Die color={props.player.color} value={1} />
    <Die color={props.player.color} value={6} />
  </div>
}

export default RollSurface
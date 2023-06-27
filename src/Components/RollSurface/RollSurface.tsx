import { Player } from '../../Models/Backgammon'
import Die from '../Die/Die'
import { Grid } from '@mui/material'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    alert(`Roll dice for ${props.player.color.toString()}`)
  }

  return <Grid item className='roll-surface' onClick={clickHandler}>
    <Die color={props.player.color} value={5} />
    <Die color={props.player.color} value={6} />
  </Grid>
}

export default RollSurface
import { Color, Player } from '../../Models/Backgammon'
import Die from '../Die/Die'
import { Grid } from '@mui/material'

interface RollSurfaceProps {
  player: Player
}

const RollSurface = (props: RollSurfaceProps) => {

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target)
  }

  return <Grid item className='roll-surface' onClick={clickHandler}>
    <Die color={props.player.color} />
    <Die color={props.player.color} />

  </Grid>
}

export default RollSurface
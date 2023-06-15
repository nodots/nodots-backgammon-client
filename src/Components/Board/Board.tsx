import { Grid } from '@mui/material'
import { Game } from '../../Models/Game'
import Quadrant from '../Quadrant/Quadrant'

import './Board.scss'

interface BoardProps {
  game: Game | undefined
  colorScheme?: string
}

const Board = (props: BoardProps) => {
  return <Grid container id='NodotsBgBoard'>
    <Grid container className='top'>
      <Quadrant location='ne' />
      <Quadrant location='nw' />
    </Grid>
    <Grid container className='bottom'>
      <Quadrant location='sw' />
      <Quadrant location='se' />
    </Grid>
  </Grid>
}

export default Board
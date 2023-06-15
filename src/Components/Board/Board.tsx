import { Grid } from '@mui/material'
import { Game } from '../../Models/Game'
import Quadrant from '../Quadrant/Quadrant'

import './Board.scss'

interface BoardProps {
  game: Game | undefined
  colorScheme?: string
}

const Board = (props: BoardProps) => {
  if (props.game) {

    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        <Quadrant location='nw' quadrant={props.game.board.quadrants.filter(q => q.location === 'nw')[0]} />
        <Quadrant location='sw' quadrant={props.game.board.quadrants.filter(q => q.location === 'sw')[0]} />
      </Grid>
      <Grid item className='rail'>
      </Grid>
      <Grid item className='col right'>
        <Quadrant location='ne' quadrant={props.game.board.quadrants.filter(q => q.location === 'ne')[0]} />
        <Quadrant location='se' quadrant={props.game.board.quadrants.filter(q => q.location === 'se')[0]} />
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }

}

export default Board
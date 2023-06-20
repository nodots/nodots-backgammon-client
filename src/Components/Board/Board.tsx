import { Grid } from '@mui/material'
import { Game } from '../../Models/Game'
import Quadrant from '../Quadrant/Quadrant'

import './Board.scss'

interface BoardProps {
  game: Game | undefined
  colorScheme?: string
}

const Board = (props: BoardProps) => {
  if (props.game?.board) {
    const neQuadrant = props.game.board.quadrants.find(q => q.location === 'ne')
    const nwQuadrant = props.game.board.quadrants.find(q => q.location === 'nw')
    const swQuadrant = props.game.board.quadrants.find(q => q.location === 'sw')
    const seQuadrant = props.game.board.quadrants.find(q => q.location === 'se')

    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {nwQuadrant && <Quadrant location='nw' quadrant={nwQuadrant} />}
        {swQuadrant && <Quadrant location='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location='ne' quadrant={neQuadrant} />}
        {seQuadrant && <Quadrant location='se' quadrant={seQuadrant} />}
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
import { Grid } from '@mui/material'
import { Game } from '../../Models/Game'
import Die from '../Die/Die'
import Quadrant from '../Quadrant/Quadrant'
import RollSurface from '../RollSurface/RollSurface'

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
        <RollSurface player={props.game.players.black} />
        {swQuadrant && <Quadrant location='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location='ne' quadrant={neQuadrant} />}
        <RollSurface player={props.game.players.white} />
        {seQuadrant && <Quadrant location='se' quadrant={seQuadrant} />}
      </Grid>

      {/* <Grid item className='off-container'>
      </Grid> */}
    </Grid>

  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
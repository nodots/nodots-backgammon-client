import { Grid } from '@mui/material'
import { Game } from '../../Models/Game'
import Quadrant from '../Quadrant/Quadrant'
import Rail from '../Rail/Rail'
import Off from '../Off/Off'
import RollSurface from '../RollSurface/RollSurface'

interface BoardProps {
  game: Game | undefined
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
        <Grid item className='roll-surface'>
          <RollSurface player={props.game.players.black} />
        </Grid>
        {swQuadrant && <Quadrant location='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
        <Rail rail={props.game.board.rail} />
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location='ne' quadrant={neQuadrant} />}
        <Grid item className='roll-surface'>
          <RollSurface player={props.game.players.white} />

        </Grid>
        {seQuadrant && <Quadrant location='se' quadrant={seQuadrant} />}
      </Grid>
      <Grid item className='off-container'>
        <Off off={props.game.board.off} cube={props.game.cube} />
      </Grid>
    </Grid>

  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
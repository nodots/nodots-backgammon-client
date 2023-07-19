import { useGame } from '../../State'
import { Grid } from '@mui/material'
import Quadrant from '../Quadrant/Quadrant'
import Rail from '../Rail/Rail'
import Off from '../Off/Off'
import RollSurface from '../RollSurface/RollSurface'

const Board = () => {
  const ctx = useGame()

  if (ctx?.board && ctx?.players?.white && ctx?.players?.black) {
    const neQuadrant = ctx.board.quadrants.find(q => q.location === 'ne')
    const nwQuadrant = ctx.board.quadrants.find(q => q.location === 'nw')
    const swQuadrant = ctx.board.quadrants.find(q => q.location === 'sw')
    const seQuadrant = ctx.board.quadrants.find(q => q.location === 'se')

    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {nwQuadrant && <Quadrant location='nw' quadrant={nwQuadrant} />}
        <Grid item className='roll-surface'>
          {ctx.players.black && <RollSurface player={ctx.players.black} />}
        </Grid>
        {swQuadrant && <Quadrant location='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
        <Rail rail={ctx.board.rail} />
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location='ne' quadrant={neQuadrant} />}
        <Grid item className='roll-surface'>
          {ctx.players.white && <RollSurface player={ctx.players.white} />}

        </Grid>
        {seQuadrant && <Quadrant location='se' quadrant={seQuadrant} />}
      </Grid>
      <Grid item className='off-container'>
        {ctx.board.off && ctx.cube && <Off off={ctx.board.off} cube={ctx.cube} />}
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
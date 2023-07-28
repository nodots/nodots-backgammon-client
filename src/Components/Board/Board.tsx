import { useGame } from '../../hooks/useGame'
import { Grid } from '@mui/material'
import Quadrant from '../Quadrant/Quadrant'
import Rail from '../Rail/Rail'
import Off from '../Off/Off'
import RollSurface from '../RollSurface/RollSurface'

const Board = () => {
  const { board, players, cube, rollSurfaces, debug } = useGame()

  if (board && players?.white && players?.black) {
    const neQuadrant = board.quadrants.find(q => q.location === 'ne')
    const nwQuadrant = board.quadrants.find(q => q.location === 'nw')
    const swQuadrant = board.quadrants.find(q => q.location === 'sw')
    const seQuadrant = board.quadrants.find(q => q.location === 'se')

    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {nwQuadrant && <Quadrant location='nw' quadrant={nwQuadrant} />}
        <Grid item className='roll-surface'>
          {players.black && <RollSurface rollSurface={rollSurfaces.black} />}
        </Grid>
        {swQuadrant && <Quadrant location='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
        <Rail rail={board.rail} />
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location='ne' quadrant={neQuadrant} />}
        <Grid item className='roll-surface'>
          {players.white && <RollSurface rollSurface={rollSurfaces.white} />}

        </Grid>
        {seQuadrant && <Quadrant location='se' quadrant={seQuadrant} />}
      </Grid>
      <Grid item className='off-container'>
        {board.off && cube && <Off off={board.off} cube={cube} />}
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
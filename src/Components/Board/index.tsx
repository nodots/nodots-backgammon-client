// Hooks
import { useGame } from '../../useGame'

// Types
import { QuadrantLocation } from '../Quadrant/state/types'

// UI
import { Grid } from '@mui/material'

// Components
import Quadrant from '../Quadrant'
import Rail from '../Rail'
import Off from '../Off'
import RollSurface from '../RollSurface'
import Cube from '../Cube'
// import { DiceProvider } from '../Die/state/dice.provider'

const Board = () => {
  const { game } = useGame()
  const { players, cube } = game

  const board = game.board

  if (board) {
    const nwQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NW)
    const neQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NE)
    const swQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SW)
    const seQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SE)
    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {nwQuadrant && <Quadrant location={QuadrantLocation.NW} locationString='nw' quadrant={nwQuadrant} />}
        <Grid item className='roll-surface'>
          {players.black && <RollSurface color='black' />}
        </Grid>
        {swQuadrant && <Quadrant location={QuadrantLocation.SW} locationString='sw' quadrant={swQuadrant} />}
      </Grid>
      <Grid item className='rail'>
        <Rail rail={board.rail.black} />
        <Rail rail={board.rail.white} />
      </Grid>
      <Grid item className='col right'>
        {neQuadrant && <Quadrant location={QuadrantLocation.NE} locationString='ne' quadrant={neQuadrant} />}
        <Grid item className='roll-surface'>
          {players.white && <RollSurface color='white' />}
        </Grid>
        {seQuadrant && <Quadrant location={QuadrantLocation.SE} locationString='sw' quadrant={seQuadrant} />}
      </Grid>
      {/* Cube position changes with ownership, starting un-owned */}
      <Grid item className='off-container'>
        <div className='cube-container'>
          {cube.owner === 'black' && <Cube />}
        </div>
        <Off off={board.off.black} />
        <div className='cube-container'>
          {!cube.owner &&
            <Cube />
          }
        </div>
        <Off off={board.off.white} />
        <div className='cube-container'>
          {cube.owner === 'white'
            && <Cube />}
        </div>
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
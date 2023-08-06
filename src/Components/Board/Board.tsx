// Hooks
import { useGame } from '../../hooks/useGame'

// UI
import { Grid } from '@mui/material'

// Components
import Quadrant from '../Quadrant/Quadrant'
import Rail from '../Rail/Rail'
import Off from '../Off/Off'
import RollSurface from '../RollSurface/RollSurface'
import { DiceProvider } from '../../state/dice/dice.provider'
import { QuadrantLocation } from '../../models'

const Board = () => {
  const { board, players, } = useGame()

  if (board && players?.white && players?.black) {
    const neQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NE)
    const nwQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NW)
    const swQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SW)
    const seQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SE)

    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {nwQuadrant && <Quadrant location={QuadrantLocation.NW} locationString='nw' quadrant={nwQuadrant} />}
        <Grid item className='roll-surface'>
          {players.black && <DiceProvider><RollSurface color='black' /></DiceProvider>}
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

          {players.white && <DiceProvider><RollSurface color='white' /></DiceProvider>}
        </Grid>
        {seQuadrant && <Quadrant location={QuadrantLocation.SE} locationString='sw' quadrant={seQuadrant} />}
      </Grid>
      <Grid item className='off-container'>
        <Off off={board.off.black} />
        <Off off={board.off.white} />

      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
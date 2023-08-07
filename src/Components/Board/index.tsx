// Hooks
import { useBoard } from './state/useBoard'
// import { useCube } from '../Cube/state/useCube'

import { QuadrantLocation } from '../Quadrant/state/types'

// UI
import { Grid } from '@mui/material'

// Components
import Quadrant from '../Quadrant'
import Rail from '../Rail'
import Off from '../Off'
// import RollSurface from '../RollSurface'
// import Cube from '../Cube'
// import { DiceProvider } from '../Die/state/dice.provider'

const Board = () => {
  // const { cube } = useCube()
  const { board } = useBoard()

  if (board) {
    return <Grid container id='NodotsBgBoard'>
      <Grid item className='col left'>
        {board.quadrants.NW && <Quadrant location={QuadrantLocation.NW} locationString='nw' quadrant={board.quadrants.NW} />}
        <Grid item className='roll-surface'>
          {/* {players.black && <DiceProvider><RollSurface color='black' /></DiceProvider>} */}
        </Grid>
        {board.quadrants.SW && <Quadrant location={QuadrantLocation.SW} locationString='sw' quadrant={board.quadrants.SW} />}
      </Grid>
      <Grid item className='rail'>
        <Rail rail={board.rail.black} />
        <Rail rail={board.rail.white} />
      </Grid>
      <Grid item className='col right'>
        {board.quadrants.NE && <Quadrant location={QuadrantLocation.NE} locationString='ne' quadrant={board.quadrants.NE} />}
        <Grid item className='roll-surface'>
          {/* {players.white && <DiceProvider><RollSurface color='white' /></DiceProvider>} */}
        </Grid>
        {board.quadrants.SE && <Quadrant location={QuadrantLocation.SE} locationString='sw' quadrant={board.quadrants.SE} />}
      </Grid>
      {/* Cube position changes with ownership, starting un-owned */}
      <Grid item className='off-container'>
        <div className='cube-container'>
          {/* {cube.owner === 'black' && <Cube />} */}
        </div>
        <Off off={board.off.black} />
        <div className='cube-container'>
          {/* {!cube.owner &&
            <Cube />
          } */}
        </div>
        <Off off={board.off.white} />
        <div className='cube-container'>
          {/* {cube.owner === 'white'
            && <Cube />} */}
        </div>
      </Grid>
    </Grid>
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
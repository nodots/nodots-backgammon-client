import { Paper, Box, Container } from '@mui/material'
import { useState } from 'react'
// Hooks
import { useGame } from '../../game/useGame'

// Types
import { Quadrant as QuadrantType, QuadrantLocation } from '../Quadrant/state/types'

// Components
import Quadrant from '../Quadrant'
import { PointLabelContainer } from '../Quadrant'
import Rail from '../Rail'
import Off from '../Off'
import RollSurface from '../RollSurface'
import Cube from '../Cube'
import Die from '../Die'

import './board.scss'

const Board = () => {
  const { game } = useGame()
  const { players, cube, board } = game

  if (board) {
    const nwQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NW) as QuadrantType
    const neQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.NE) as QuadrantType
    const swQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SW) as QuadrantType
    const seQuadrant = board.quadrants.find(q => q.location === QuadrantLocation.SE) as QuadrantType
    return (
      <span className='board'>
        <Paper className='board-half west' elevation={4}>
          <PointLabelContainer quadrant={nwQuadrant} startingPosition={13} quadrantLocation={QuadrantLocation.NW} />
          <Quadrant quadrant={nwQuadrant} startingPosition={13} quadrantLocation={QuadrantLocation.NW} />
          <Box className='roll-surface'>
            {players.black && <RollSurface color='black' />}
          </Box>
          <Quadrant quadrant={swQuadrant} startingPosition={7} quadrantLocation={QuadrantLocation.SW} />
          <PointLabelContainer quadrant={swQuadrant} startingPosition={7} quadrantLocation={QuadrantLocation.SW} />
        </Paper>
        <Paper className='rail' elevation={4}>
          <Paper className='pip-count black'>{players.black.pipCount}</Paper>
          <Paper className='rail-checker-box white'><Rail rail={game.board.rail.black} /></Paper>
          <Paper className='rail-checker-box black'><Rail rail={game.board.rail.white} /></Paper>
          <Paper className='pip-count white'>{players.white.pipCount}</Paper>
        </Paper>
        <Paper className='board-half east' elevation={4}>
          <PointLabelContainer quadrant={neQuadrant} startingPosition={19} quadrantLocation={QuadrantLocation.NE} />
          <Quadrant quadrant={neQuadrant} startingPosition={19} quadrantLocation={QuadrantLocation.NE} />
          <Box className='roll-surface'>
            {players.white && <RollSurface color='white' />}
          </Box>
          <Quadrant quadrant={seQuadrant} startingPosition={1} quadrantLocation={QuadrantLocation.SW} />
          <PointLabelContainer quadrant={seQuadrant} startingPosition={1} quadrantLocation={QuadrantLocation.SW} />
        </Paper>
        <Paper className='off-container' elevation={4}>
          <Box className='off-container-inner'>
            <Paper className='dice-container black'>
              {
                game.players.white.active && <>
                  <Die order={0} value={1} color='black' />
                  <Die order={1} value={1} color='black' />
                </>
              }
            </Paper>
            <Paper className='cube-container'>
              {game.cube.owner === 'black' && <Cube />}
            </Paper>
            <Paper className='off-checker-box black'><Off off={game.board.off.black} /></Paper>
            <Paper className='cube-container'>
              {game.cube.owner === undefined && <Cube />}
            </Paper>
            <Paper className='off-checker-box white'><Off off={game.board.off.white} /></Paper>
            <Paper className='cube-container'>
              {game.cube.owner === 'white' && <Cube />}
            </Paper>
            <Paper className='dice-container white'>
              {
                game.players.black.active && <>
                  <Die order={0} value={1} color='white' />
                  <Die order={1} value={1} color='white' />
                </>
              }
            </Paper>
          </Box>
        </Paper>
      </span>
    )
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
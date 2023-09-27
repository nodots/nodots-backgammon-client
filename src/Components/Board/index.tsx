import { Paper, Box, Container } from '@mui/material'
import { useState } from 'react'
// Hooks
import { useGame } from '../../game/useGame'

// Types
import { Quadrant as QuadrantType } from '../Quadrant/state/types'
import { QuadrantLocation } from '../Quadrant/state/types'

// Components
import Quadrant from '../Quadrant'
import { PointLabelContainer } from '../Quadrant'
import Rail from '../Rail'
import Off from '../Off'
import RollSurface from '../RollSurface'
import Cube from '../Cube'
import Die from '../Die'
import { CheckerProp } from './state/types/board'

import './board.scss'

const Board = () => {
  const [isLoadModalOpen, setIsLoadModalOpen] = useState<boolean>(false)
  const { game } = useGame()
  const { players, cube, board } = game

  type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick'

  const closeLoadModal = (e: React.MouseEvent) => {
    setIsLoadModalOpen(false)
  }

  const pipSaveClickHandler = (e: React.MouseEvent) => {
    console.log('[USER NOTICE]: Saving board')
    const date = new Date()
    const filename = `${date.toISOString()}.${date.getTime()}.json`

    let config: CheckerProp[] = []

    game.board.quadrants.forEach(q => {
      q.points.forEach(p => {
        console.log(p)
        if (p.checkers.length > 0) {
          const cp: CheckerProp = {
            color: p.checkers[0].color,
            checkerCount: p.checkers.length,
            position: p.position,
          }
          config.push(cp)
        }
      })
    })

    let whiteRail: CheckerProp | undefined
    if (game.board.rail.white.checkers.length > 0) {
      whiteRail = {
        color: 'white',
        checkerCount: game.board.rail.white.checkers.length,
        position: 'rail'
      }
    }
    if (whiteRail) {
      config.push(whiteRail)
    }

    let blackRail: CheckerProp | undefined
    if (game.board.rail.black.checkers.length > 0) {
      blackRail = {
        color: 'black',
        checkerCount: game.board.rail.black.checkers.length,
        position: 'rail'
      }
    }

    if (blackRail) {
      config.push(blackRail)
    }

    let whiteOff: CheckerProp | undefined
    if (game.board.off.white.checkers.length > 0) {
      whiteRail = {
        color: 'white',
        checkerCount: game.board.off.white.checkers.length,
        position: 'off'
      }
    }
    if (whiteOff) {
      config.push(whiteOff)
    }

    let blackOff: CheckerProp | undefined
    if (game.board.off.black.checkers.length > 0) {
      blackOff = {
        color: 'black',
        checkerCount: game.board.off.black.checkers.length,
        position: 'off'
      }
    }

    if (blackOff) {
      config.push(blackOff)
    }

    const dummyLink = document.createElement('a')
    dummyLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(config)))
    dummyLink.setAttribute('download', filename)
    document.body.appendChild(dummyLink)
    dummyLink.click()
    document.body.removeChild(dummyLink)
  }

  const pipLoadClickHandler = (e: React.MouseEvent) => {
    console.log('pipLoadClickHandler')
    setIsLoadModalOpen(true)
  }

  const loadBoardHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target
      && e.target.files
      && e.target.files[0]
    ) {
      const boardFile = e.target.files[0]
      const stream = boardFile.stream()
      const boardReader = new ReadableStream(stream)
      const reader = await boardReader.getReader()
      let charsReceived: number = 0
      let gameString: string = ''

      const result = await reader.read()
    }
  }

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
          <Paper className='pip-count white'>{players.black.pipCount}</Paper>
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
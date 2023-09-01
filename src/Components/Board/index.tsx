import { useState } from 'react'
// Hooks
import { useGame } from '../../game/useGame'

// Types
import { Board as BoardType } from './state'
import { QuadrantLocation } from '../Quadrant/state/types'

// UI
import { Grid, Button, Dialog, DialogTitle, Input, DialogContent, DialogActions } from '@mui/material'

// Components
import Quadrant from '../Quadrant'
import Rail from '../Rail'
import Off from '../Off'
import RollSurface from '../RollSurface'
import Cube from '../Cube'
import Die from '../Die'
import { CheckerProp } from './state/types/board'

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

    console.log(config)
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
      console.log(result)

    }
  }

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
        <Button className='pip-count black' onClick={pipSaveClickHandler}>{game.players.black.pipCount}</Button>
        <Rail rail={board.rail.black} />
        <Rail rail={board.rail.white} />
        <Button className='pip-count white' onClick={pipLoadClickHandler}>{game.players.white.pipCount}</Button>
        <Dialog open={isLoadModalOpen}>
          <DialogTitle>Import Board Config</DialogTitle>
          <DialogContent>
            <Input type='file' onChange={loadBoardHandler} inputProps={{ accept: '*.json' }}></Input>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLoadModal}>Upload</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item className='col right'>
        {/* FIXME: the locationString shouldn't be necessary */}
        {neQuadrant && <Quadrant location={QuadrantLocation.NE} locationString='ne' quadrant={neQuadrant} />}
        <Grid item className='roll-surface'>
          {players.white && <RollSurface color='white' />}
        </Grid>
        {seQuadrant && <Quadrant location={QuadrantLocation.SE} locationString='sw' quadrant={seQuadrant} />}
      </Grid>
      {/* Cube position changes with ownership, starting un-owned */}
      <Grid item className='off-container'>
        <div className='dice-container'>
          {game.activeColor !== 'black' &&
            <>
              <Die color='black' order={0} value={1} />
              <Die color='black' order={1} value={1} />
            </>
          }
        </div>
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
        <div className='dice-container'>
          {game.activeColor !== 'white' && <>
            <Die color='white' order={0} value={1} />
            <Die color='white' order={1} value={1} />
          </>}
        </div>
      </Grid>
    </Grid >
  } else {
    return <h1>No Game Set</h1>
  }
}

export default Board
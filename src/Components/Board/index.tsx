import './scss/index.scss'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import { Paper, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

interface Props {
  store: NodotsGameStore
}

function Board({ store }: Props) {
  const { state } = store
  const { game } = state
  const { board } = game
  const theme = useTheme()

  return (
    <Paper id="BoardContainer" elevation={2}>
      <Paper id="West" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="west"
          start={13}
          state={state}
          store={store}
          points={board.quadrants.west.north.points}
        />
        <Rollsurface state={state} store={store} color="black" />
        <Quadrant
          latitude="south"
          longitude="west"
          start={7}
          state={state}
          store={store}
          points={board.quadrants.west.south.points}
        />
      </Paper>
      <Bar state={state} />
      <Paper id="East" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="east"
          start={19}
          state={state}
          store={store}
          points={board.quadrants.east.north.points}
        />
        <Rollsurface state={state} store={store} color="white" />
        <Quadrant
          latitude="south"
          longitude="east"
          start={1}
          state={state}
          store={store}
          points={board.quadrants.east.south.points}
        />
      </Paper>
      <Off store={store} />
    </Paper>
  )
}

export default observer(Board)

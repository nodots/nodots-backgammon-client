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
import {
  Confirming,
  Moving,
  NodotsGameState,
  Ready,
  Rolling,
  RollingForStart,
} from '../../game/Types'

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
}

function Board({ store, state }: Props) {
  const { board } = state
  const theme = useTheme()
  switch (state.kind) {
    case 'initializing':
      return <></>
    case 'confirming':
    case 'moving':
    case 'ready':
    case 'rolling':
    case 'rolling-for-start':
      return (
        <Paper id="BoardContainer" elevation={2}>
          <Paper id="West" className="board-half" elevation={1}>
            <Quadrant
              store={store}
              latitude="north"
              longitude="west"
              start={13}
              state={state}
              points={board.quadrants.west.north.points}
            />
            <Rollsurface store={store} state={state} color="black" />
            <Quadrant
              store={store}
              latitude="south"
              longitude="west"
              start={7}
              state={state}
              points={board.quadrants.west.south.points}
            />
          </Paper>
          <Bar state={state} />
          <Paper id="East" className="board-half" elevation={1}>
            <Quadrant
              store={store}
              latitude="north"
              longitude="east"
              start={19}
              state={state}
              points={board.quadrants.east.north.points}
            />
            <Rollsurface store={store} state={state} color="white" />
            <Quadrant
              store={store}
              latitude="south"
              longitude="east"
              start={1}
              state={state}
              points={board.quadrants.east.south.points}
            />
          </Paper>
          <Off state={state} />
        </Paper>
      )
  }
}

export default observer(Board)

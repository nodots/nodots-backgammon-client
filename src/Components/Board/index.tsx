import './scss/index.scss'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import { Paper, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'
import { NodotsGameState } from '../../GameStore/types'

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
}

function Board({ store, state }: Props) {
  const theme = useTheme()
  switch (state.kind) {
    case 'initializing':
      return <></>
    case 'confirming':
    case 'moving':
    case 'rolling':
    case 'rolled':
    case 'rolling-for-start':
      store.state.boardStore.points.map((p) =>
        console.log(
          `${p.position.clockwise} : ${p.position.counterclockwise} checkers:`,
          p.checkers.length
        )
      )
      return (
        <Paper id="BoardContainer" elevation={2}>
          <Paper id="West" className="board-half" elevation={1}>
            <Quadrant
              store={store}
              state={state}
              latitude="north"
              longitude="west"
              start={7}
              points={[]}
            />
            <Rollsurface store={store} state={state} color="black" />
            <Quadrant
              store={store}
              latitude="south"
              longitude="west"
              start={7}
              state={state}
              points={[]}
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
              points={[]}
            />
            <Rollsurface store={store} state={state} color="white" />
            <Quadrant
              store={store}
              latitude="south"
              longitude="east"
              start={1}
              state={state}
              points={[]}
            />
          </Paper>
          <Off state={state} />
        </Paper>
      )
  }
}

export default observer(Board)

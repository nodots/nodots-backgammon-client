import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import { NodotsGameState } from '../../GameStore/types'
import Bar, { Props as BarProps } from '../Bar'
import Off, { Props as OffProps } from '../Off'
import Quadrant, { QuadrantPoints, Props as QuadrantProps } from '../Quadrant'
import Rollsurface from '../Rollsurface'
import './scss/index.scss'

export type Quadrants = [
  QuadrantProps,
  QuadrantProps,
  QuadrantProps,
  QuadrantProps
]

export interface BoardDisplay {
  quadrants: Quadrants
  bar: BarProps
  off: OffProps
}

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
}

function Board({ store, state }: Props) {
  switch (state.kind) {
    case 'initializing':
      return <></>
    case 'confirming':
    case 'confirmed':
    case 'moving':
    case 'rolling':
    case 'rolled':
    case 'rolling-for-start':
      return (
        <Paper id="BoardContainer" elevation={2}>
          <Paper id="West" className="board-half" elevation={1}>
            <Quadrant
              store={store}
              boardStore={store.state.boardStore}
              latitude="north"
              longitude="west"
              start={13}
              points={
                store.state.boardStore.points.slice(12, 18) as QuadrantPoints
              }
            />
            <Rollsurface store={store} state={state} color="black" />
            <Quadrant
              store={store}
              boardStore={store.state.boardStore}
              latitude="south"
              longitude="west"
              start={7}
              points={
                store.state.boardStore.points.slice(6, 12) as QuadrantPoints
              }
            />
          </Paper>
          <Bar store={store} />
          <Paper id="East" className="board-half" elevation={1}>
            <Quadrant
              store={store}
              boardStore={store.state.boardStore}
              latitude="north"
              longitude="east"
              start={19}
              points={
                store.state.boardStore.points.slice(18, 24) as QuadrantPoints
              }
            />
            <Rollsurface store={store} state={state} color="white" />
            <Quadrant
              store={store}
              boardStore={store.state.boardStore}
              latitude="south"
              longitude="east"
              start={1}
              points={
                store.state.boardStore.points.slice(0, 6) as QuadrantPoints
              }
            />
          </Paper>
          <Off store={store} />
        </Paper>
      )
  }
}

export default observer(Board)

import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import { NodotsGameState } from '../../GameStore/types'
import './scss/index.scss'
import { Checkercontainer, Point } from '../../GameStore/types/Checkercontainer'
import Quadrant from '../Quadrant'
import RollSurface from '../RollSurface'
// import Bar from '../Bar'
// import Off from '../Off'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface QuadrantProps {
  latitude: 'north' | 'south'
  longitude: 'east' | 'west'
  start: number
  points: QuadrantPoints
}

export type Quadrants = [
  QuadrantProps,
  QuadrantProps,
  QuadrantProps,
  QuadrantProps
]

export interface BoardDisplay {
  quadrants: Quadrants
  bar: {
    white: Checkercontainer
    black: Checkercontainer
  }
  off: {
    white: Checkercontainer
    black: Checkercontainer
  }
}

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
}

function Board({ store, state }: Props) {
  switch (state.kind) {
    case 'game-initializing':
      return <></>
    case 'game-confirming':
    case 'game-confirmed':
    case 'game-moving':
    case 'game-rolling':
    case 'game-rolled':
    case 'game-rolling-for-start':
    case 'game-completed':
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
            <RollSurface store={store} state={state} color="black" />
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
            <RollSurface store={store} state={state} color="white" />
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

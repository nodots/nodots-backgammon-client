import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import Bar, { Props as BarProps } from './Bar'
import Off, { Props as OffProps } from './Off'
import Quadrant, { QuadrantPoints, Props as QuadrantProps } from './Quadrant'
import Rollsurface from './Rollsurface'
import './scss/index.scss'
import { NodotsGame } from '../../stores/Game'

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
  store: NodotsGame
}

function Board({ store }: Props) {
  return (
    <Paper id="BoardContainer" elevation={2}>
      <Paper id="West" className="board-half" elevation={1}>
        <Quadrant
          store={store}
          latitude="north"
          longitude="west"
          start={13}
          points={store.board.points.slice(12, 18) as QuadrantPoints}
        />
        <Rollsurface store={store} color="black" />
        <Quadrant
          store={store}
          latitude="south"
          longitude="west"
          start={7}
          points={store.board.points.slice(6, 12) as QuadrantPoints}
        />
      </Paper>
      <Bar store={store} />
      <Paper id="East" className="board-half" elevation={1}>
        <Quadrant
          store={store}
          latitude="north"
          longitude="east"
          start={19}
          points={store.board.points.slice(18, 24) as QuadrantPoints}
        />
        <Rollsurface store={store} color="white" />
        <Quadrant
          store={store}
          latitude="south"
          longitude="east"
          start={1}
          points={store.board.points.slice(0, 6) as QuadrantPoints}
        />
      </Paper>
      <Off store={store} />
    </Paper>
  )
}

export default observer(Board)

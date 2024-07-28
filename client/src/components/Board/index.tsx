import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { NodotsGameStore } from '../../stores/Game/Store'
import Bar, { Props as BarProps } from './Bar'
import Off, { Props as OffProps } from './Off'
import Quadrant, { QuadrantPoints, Props as QuadrantProps } from './Quadrant'
import Rollsurface from './Rollsurface'
import './scss/index.scss'
import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameCompleted,
} from '../../stores/Game/Types'
import { useStore } from '../../stores/RootStore'

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

function Board() {
  const { gameStore } = useStore()
  switch (gameStore.gameState.kind) {
    case 'game-initializing':
    case 'game-completed':
    case 'game-rolling-for-start':
      return <></>
    case 'game-playing-moving':
    case 'game-playing-rolling':
      const game = gameStore.gameState as GamePlayingRolling // FIXME
      return (
        <Paper id="BoardContainer" elevation={2}>
          <Paper id="West" className="board-half" elevation={1}>
            <Quadrant
              gameStore={gameStore}
              latitude="north"
              longitude="west"
              start={13}
              points={game.board.points.slice(12, 18) as QuadrantPoints}
            />
            <Rollsurface gameStore={gameStore} color="black" />
            <Quadrant
              gameStore={gameStore}
              latitude="south"
              longitude="west"
              start={7}
              points={game.board.points.slice(6, 12) as QuadrantPoints}
            />
          </Paper>
          <Bar gameStore={gameStore} />
          <Paper id="East" className="board-half" elevation={1}>
            <Quadrant
              gameStore={gameStore}
              latitude="north"
              longitude="east"
              start={19}
              points={game.board.points.slice(18, 24) as QuadrantPoints}
            />
            <Rollsurface gameStore={gameStore} color="white" />
            <Quadrant
              gameStore={gameStore}
              latitude="south"
              longitude="east"
              start={1}
              points={game.board.points.slice(0, 6) as QuadrantPoints}
            />
          </Paper>
          <Off gameStore={gameStore} />
        </Paper>
      )
  }
}

export default observer(Board)

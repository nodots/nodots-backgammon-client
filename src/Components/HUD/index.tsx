import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
// import DiceEventsNotification from '../Board/Dice/Events'
// import PlayerEventNotification from '../Player/Events'
// import DiceSwitcherEventsNotification from '../Board/DiceSwitcher/Events'
// import GameWinProbabilityNotification from '../Board/Events'
import PipCountNotification from './PipCountNotification'
import {
  GameCompleted,
  GamePlaying,
  NodotsGameState,
} from '../../stores/Game/Types'
import { NodotsGameStore } from '../../stores/Game/Store'
import RootStore from '../../stores'

interface Props {
  store: RootStore
}

function HUDComponent({ store }: Props) {
  const gameStore = store.gameStore
  switch (gameStore.state.kind) {
    case 'game-playing':
      const gameState = gameStore.state as GamePlaying // FIXME
      const playState = gameState.playStore
      return (
        <Paper id="HUDContainer" elevation={2}>
          <h2>Root Store</h2>
          <>{store.name}</>
          <h2>Game Store</h2>
          <h3>Current Game State</h3>
          <>{store.gameStore.state.kind}</>
          <h3>Current Play State</h3>
          <>{playState.state.kind}</>
          {/* <PipCountNotification state={state} /> */}
          {/* <PlayerEventNotification state={state} />
              <DiceEventsNotification state={state} /> */}
          {/* <CheckerEventsNotification state={state} />
              <CubeEventsNotification state={state} />
              <DiceSwitcherEventsNotification state={state} /> */}
        </Paper>
      )
    default:
  }
}

export default observer(HUDComponent)

import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
// import DiceEventsNotification from '../Board/Dice/Events'
// import PlayerEventNotification from '../Player/Events'
// import DiceSwitcherEventsNotification from '../Board/DiceSwitcher/Events'
// import GameWinProbabilityNotification from '../Board/Events'
import PipCountNotification from './PipCountNotification'
import {
  GameCompleted,
  GamePlaying_Moving,
  GamePlaying_Rolling,
  NodotsGameState,
} from '../../stores/Game/Types'
import { NodotsGameStore } from '../../stores/Game/Store'
import RootStore from '../../stores/RootStore'
import StoresOverview from './StoresOverview'

interface Props {
  store: RootStore
}

function HUDComponent({ store }: Props) {
  const gameStore = store.gameStore
  switch (gameStore.state.kind) {
    case 'game-playing-rolling':
    case 'game-playing-moving':
      const gameState = gameStore.state as GamePlaying_Moving // FIXME
      const playStore = gameStore.playStore
      const playState = playStore?.playState
      return (
        <Paper id="HUDContainer" elevation={2}>
          <StoresOverview store={store} />
          {/* <PipCountNotification state={state} /> */}
          {/* <PlayerEventNotification state={state} />
              <DiceEventsNotification state={state} /> */}
          {/* <CheckerEventsNotification state={state} />
              <CubeEventsNotification state={state} />
              <DiceSwitcherEventsNotification state={state} /> */}
        </Paper>
      )
    default:
      return <></>
  }
}

export default observer(HUDComponent)

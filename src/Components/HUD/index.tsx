import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
// import DiceEventsNotification from '../Board/Dice/Events'
// import PlayerEventNotification from '../Player/Events'
// import DiceSwitcherEventsNotification from '../Board/DiceSwitcher/Events'
// import GameWinProbabilityNotification from '../Board/Events'
import PipCountNotification from './PipCountNotification'
import {
  GameCompleted,
  GamePlayingMoving,
  GamePlayingRolling,
  NodotsGameState,
} from '../../stores/Game/Types'
import RootStore, { useStore } from '../../stores/RootStore'
import StoresOverview from './StoresOverview'

function HUDComponent() {
  const { gameStore } = useStore()
  const { diceStores } = gameStore
  switch (gameStore.gameState.kind) {
    case 'game-playing-rolling':
    case 'game-playing-moving':
      return (
        <Paper id="HUDContainer" elevation={2}>
          {gameStore.gameState.kind}: {gameStore.gameState.activeColor}
          <br />
          Black Dice: {diceStores.black.diceState.kind}
          <br />
          White Dice: {diceStores.white.diceState.kind}
          {/* <StoresOverview store={store} /> */}
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

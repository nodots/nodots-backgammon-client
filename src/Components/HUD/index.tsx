import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import CheckerEventsNotification from '../Board/Checker/Events'
import CubeEventsNotification from '../Board/Cube/Events'
import DiceEventsNotification from '../Board/Dice/Events'
import PlayerEventNotification from '../Player/Events'
import DiceSwitcherEventsNotification from '../Board/DiceSwitcher/Events'
import GameWinProbabilityNotification from '../Board/Events'
import NodotsGameStore from '../../GameStore'
import PipCountNotification from './PipCountNotification'

interface Props {
  store: NodotsGameStore
}

function HUDComponent({ store }: Props) {
  return (
    <Paper id="HUDContainer" elevation={2}>
      <PipCountNotification store={store} />
      <PlayerEventNotification store={store} />
      <GameWinProbabilityNotification store={store} />
      <DiceEventsNotification store={store.state} />
      {/* <CheckerEventsNotification state={store.state} />
      <CubeEventsNotification state={store.state} />
      <DiceSwitcherEventsNotification state={store.state} /> */}
    </Paper>
  )
}

export default observer(HUDComponent)

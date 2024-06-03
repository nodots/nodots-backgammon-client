import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import CheckerEventsNotification from '../Board/Checker/Events'
import DiceEventsNotification from '../Board/Dice/Events'
import CubeEventsNotification from '../Board/Cube/Events'
import DiceSwitcherEventsNotification from '../Board/DiceSwitcher/Events'
import NodotsGameStore from '../../GameStore'

interface Props {
  store: NodotsGameStore
}

function HUDComponent({ store }: Props) {
  return (
    <Paper id="HUDContainer" elevation={2}>
      <DiceEventsNotification state={store.state} />
      <CheckerEventsNotification state={store.state} />
      <CubeEventsNotification state={store.state} />
      <DiceSwitcherEventsNotification state={store.state} />
    </Paper>
  )
}

export default observer(HUDComponent)

import { observer } from 'mobx-react'
import { Card } from '@mui/material'
import Notification from './Notification'
import {
  GameCompleted,
  GamePlaying,
  GameReady,
  NodotsGameState,
} from '../../stores/Game/Types'

interface Props {
  state: GamePlaying | GameCompleted | GameReady
}

function PipCountNotification({ state }: Props) {
  const { players } = state
  return (
    <Card className="hud-card two-column short" elevation={4}>
      <Notification player={players.black} />
      <Notification player={players.white} />
    </Card>
  )
}

export default observer(PipCountNotification)

import { observer } from 'mobx-react'
import { Card } from '@mui/material'
import Notification from './Notification'
import { NodotsGame } from '../../stores/Game'

interface Props {
  store: NodotsGame
}

function PipCountNotification({ store }: Props) {
  const { players } = store
  return (
    <Card className="hud-card two-column short" elevation={4}>
      <Notification player={players.black} />
      <Notification player={players.white} />
    </Card>
  )
}

export default observer(PipCountNotification)

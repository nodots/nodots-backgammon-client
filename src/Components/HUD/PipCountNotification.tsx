import { observer } from 'mobx-react'
import { NodotsGameState } from '../../GameStore/types'
import { Card, CardHeader, CardContent } from '@mui/material'
import Notification from './Notification'

interface Props {
  state: NodotsGameState
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

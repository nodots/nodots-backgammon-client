import { AlertColor, Card } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'

interface Props {
  store: NodotsGameStore
  severity?: AlertColor
}

function DebugNotifications({ store, severity }: Props) {
  const d = new Date()
  const ts = `${d.getHours()}:${
    d.getMinutes() < 10 ? '0' : ''
  }${d.getMinutes()}:${d.getSeconds() < 10 ? '0' : ''}${d.getSeconds()}`
  return (
    <Card
      raised={true}
      id="DebugNotifications"
    >{`${ts} > ${store.state.kind}`}</Card>
  )
}

export default observer(DebugNotifications)

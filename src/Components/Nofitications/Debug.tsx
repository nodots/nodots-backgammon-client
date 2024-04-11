import { AlertColor, Card } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import { NodotsLog } from '../../game/Types'

interface Props {
  store: NodotsGameStore
  severity?: AlertColor
}

const getLogs = (log: NodotsLog[]) => log.map((l) => <li>{l.message}</li>)

function DebugNotifications({ store, severity }: Props) {
  const { state } = store
  const { activeColor } = state.game
  const d = new Date()
  const ts = `${d.getHours()}:${
    d.getMinutes() < 10 ? '0' : ''
  }${d.getMinutes()}:${d.getSeconds() < 10 ? '0' : ''}${d.getSeconds()}`
  return (
    <Card
      raised={true}
      id="DebugNotifications"
    >{`${ts} > ${store.state.kind}: ${activeColor}`}</Card>
  )
}

export default observer(DebugNotifications)

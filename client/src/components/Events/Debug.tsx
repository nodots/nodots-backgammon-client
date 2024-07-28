import { AlertColor, Card } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'

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
    <Card raised={true} id="DebugNotifications">
      <div className="debug-state">{store.state.kind}</div>

      <div className="debug-message">
        {store.state.message?.debug ? store.state.message.debug : ''}
      </div>
    </Card>
  )
}

export default observer(DebugNotifications)

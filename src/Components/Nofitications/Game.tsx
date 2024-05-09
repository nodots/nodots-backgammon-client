import { Alert, AlertColor } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'

interface Props {
  store: NodotsGameStore
  severity?: AlertColor
}

function GameNotifications({ store, severity }: Props) {
  const { state } = store
  return (
    <div id="GameNotificationsContainer">
      {state.message?.game && (
        <Alert
          id="GameNotifications"
          variant="outlined"
          severity={severity ? severity : 'info'}
        >
          {state.message?.game} <strong>{state.kind}</strong>
        </Alert>
      )}
    </div>
  )
}

export default observer(GameNotifications)

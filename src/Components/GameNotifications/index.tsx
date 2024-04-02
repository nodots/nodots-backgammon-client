import { Alert, AlertColor } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

interface Props {
  store: NodotsGameStore
  severity?: AlertColor
}

function GameNotifications({ store, severity }: Props) {
  const { state } = store
  return (
    state.gameNotification && (
      <Alert
        id="GameNotifications"
        variant="outlined"
        severity={severity ? severity : 'info'}
      >
        {state.gameNotification}
      </Alert>
    )
  )
}

export default observer(GameNotifications)

import { Alert } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'
import React from 'react'

interface Props {
  store: NodotsGameStore
}

function GameNotifications({ store }: Props) {
  const { state } = store
  return (
    state.gameNotification && (
      <Alert id="GameNotifications" variant="outlined">
        {state.gameNotification}
      </Alert>
    )
  )
}

export default observer(GameNotifications)

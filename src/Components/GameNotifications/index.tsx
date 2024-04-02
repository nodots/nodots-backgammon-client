import { Alert } from '@mui/material'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'

interface Props {
  store: NodotsGameStore
}

function GameNotifications({ store }: Props) {
  const { state } = store
  console.log(new Date().toTimeString(), state)
  return (
    state.gameNotification && (
      <Alert id="GameNotifications" variant="outlined">
        {state.gameNotification}
      </Alert>
    )
  )
}

export default observer(GameNotifications)

import { Alert } from '@mui/material'
import { NodotsGameState } from '../../game/Types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../game'

interface Props {
  store: NodotsGameStore
  state: NodotsGameState
}

function GameNotifications({ state }: Props) {
  return (
    state.gameNotification && (
      <Alert id="GameNotifications" variant="outlined">
        {state.gameNotification}
      </Alert>
    )
  )
}

export default observer(GameNotifications)

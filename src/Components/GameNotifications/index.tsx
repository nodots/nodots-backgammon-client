import { Alert } from '@mui/material'
import { NodotsGameState } from '../../game/Types'

interface Props {
  state: NodotsGameState
}

function GameNotifications({ state }: Props) {
  return (
    <Alert id="GameNotifications" variant="outlined">
      {state.game.notificationMessage}
    </Alert>
  )
}

export default GameNotifications

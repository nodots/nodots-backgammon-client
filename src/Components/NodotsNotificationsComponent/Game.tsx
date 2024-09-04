import { Alert, AlertColor } from '@mui/material'
import useNodotsGame from '../../Contexts/Game/GameHook'

interface Props {
  severity?: AlertColor
}

function GameNotifications({ severity }: Props) {
  const { game } = useNodotsGame()
  return (
    <div id="GameNotificationsContainer">
      GameNotifications
      {/* {game.message?.game && (
        <Alert
          id="GameNotifications"
          variant="outlined"
          severity={severity ? severity : 'info'}
        >
          {game.message?.game}
        </Alert>
      )} */}
    </div>
  )
}

export default GameNotifications

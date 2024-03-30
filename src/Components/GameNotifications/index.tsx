import { Alert } from '@mui/material'
import { GameState } from '../../game/game.state'

interface Props {
  game: GameState
}

function GameNotifications({ game }: Props) {
  return (
    <Alert id="GameNotifications" variant="outlined">
      {game.notificationMessage}
    </Alert>
  )
}

export default GameNotifications

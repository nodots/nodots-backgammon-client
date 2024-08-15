import { Paper } from '@mui/material'
import NodotsBoardComponent from '../../Components/NodotsBoardComponent'
import GameNotifications from '../../Components/NodotsNotificationsComponent/Game'

function GamePage() {
  return (
    <Paper id="GameContainer">
      <GameNotifications />
      <NodotsBoardComponent />
    </Paper>
  )
}

export default GamePage

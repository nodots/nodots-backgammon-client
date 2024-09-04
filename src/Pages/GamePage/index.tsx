import { Paper } from '@mui/material'
import NodotsBoardComponent from '../../Components/NodotsBoardComponent'
import GameNotifications from '../../Components/NodotsNotificationsComponent/Game'
import { useNodotsPlayer } from '../../Contexts/Player/PlayerHook'

function GamePage() {
  const { player } = useNodotsPlayer()
  return (
    <Paper id="GameContainer">
      <GameNotifications />
      <NodotsBoardComponent />
    </Paper>
  )
}

export default GamePage

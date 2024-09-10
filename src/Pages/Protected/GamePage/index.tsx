import { Paper } from '@mui/material'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'
import GameNotifications from '../../../Components/NodotsNotificationsComponent/GameNotifications'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
import useNodotsGame from '../../../Contexts/Game/GameHook'

function GamePage() {
  const { state, dispatch } = useNodotsPlayer()
  // const { gameContext } = useNodotsGame()
  // console.log(gameContext)
  return (
    <Paper id="GameContainer">
      <GameNotifications />
      <NodotsBoardComponent />
    </Paper>
  )
}

export default GamePage

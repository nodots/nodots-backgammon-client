import { Paper } from '@mui/material'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'
import GameNotifications from '../../../Components/NodotsNotificationsComponent/GameNotifications'
import { useNodotsPlayer } from '../../../Contexts/Player/useNodotsPlayer'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { NodotsGame } from '../../../../nodots_modules/backgammon-types'

interface Props {
  game: NodotsGame
}

function GamePage({ game }: Props) {
  const { playerState, playerDispatch } = useNodotsPlayer()
  // const { gameState, gameDispatch } = useNodotsGame()
  // console.log(gameContext)
  return (
    <Paper id="GameContainer">
      <GameNotifications />
      <NodotsBoardComponent />
    </Paper>
  )
}

export default GamePage

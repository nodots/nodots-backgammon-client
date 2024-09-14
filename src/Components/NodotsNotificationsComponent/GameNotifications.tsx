import { Alert, AlertColor } from '@mui/material'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
// import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'

interface Props {
  severity?: AlertColor
}

function GameNotifications({ severity }: Props) {
  const { gameState } = useNodotsGame()
  const { game } = gameState
  console.log(game)
  return game ? (
    <Alert severity={severity}>{game.id}</Alert>
  ) : (
    <div>Loading...</div>
  )
}

export default GameNotifications

// return player ? (
//   <Container>
//     <NodotsAppBar />
//     <Friends />
//     {/* <PollForGame /> */}
//   </Container>
// ) : (
//   <div>Loading...</div>
// )

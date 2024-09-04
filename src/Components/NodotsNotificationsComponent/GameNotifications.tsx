import { Alert, AlertColor } from '@mui/material'
import useNodotsGame from '../../Contexts/Game/GameHook'

interface Props {
  severity?: AlertColor
}

function GameNotifications({ severity }: Props) {
  const { gameContext } = useNodotsGame()
  console.log('[GameNotifications] game:', gameContext?.game)
  return gameContext ? <>GameNotifications</> : <>Loading Game ...</>
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

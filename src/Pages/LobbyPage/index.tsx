import { Container } from '@mui/material'
import Friends from '../../Components/Lobby/Friends'
import NodotsAppBar from '../../Components/NodotsAppBar'
import { useNodotsPlayer } from '../../Contexts/Player/PlayerHook'

const LobbyPage = () => {
  const { player } = useNodotsPlayer()

  const handleSeekingGameChange = (
    e: React.MouseEvent,
    seekingGame: boolean
  ) => {
    console.log(e, seekingGame)
  }

  return player ? (
    <Container>
      <NodotsAppBar />
      <Friends />
      {/* <PollForGame /> */}
    </Container>
  ) : (
    <div>Loading...</div>
  )
}

export default LobbyPage

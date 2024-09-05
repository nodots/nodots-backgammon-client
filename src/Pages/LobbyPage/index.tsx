import { Container } from '@mui/material'
import Friends from '../../Components/Lobby/Friends'
import NodotsAppBar from '../../Components/NodotsAppBar'
import { useNodotsPlayer } from '../../Contexts/Player/PlayerHook'
import { Loading } from '../../Components/Loading'

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
    <Loading />
  )
}

export default LobbyPage

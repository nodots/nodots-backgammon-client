import { Container } from '@mui/material'
import { NodotsAppBar } from '../../Components/NodotsAppBar'
import Friends from './ChildComponents/Opponents'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'
import { Loading } from '../../Components/utils/Loading'

const LobbyPage = () => {
  const { playerState: state, playerDispatch: dispatch } = usePlayerContext()
  const { player } = state
  switch (player?.kind) {
    case 'initializing':
      return <Loading message="Lobby Page Initializing Player" />
    case 'playing':
      return (
        <Loading message="You have a game and should be on the game page" />
      )
    case 'ready':
      return (
        <>
          <NodotsAppBar />
          <Container>
            <SeekingGameToggle />
            <Friends />
          </Container>
        </>
      )
  }
}

export default LobbyPage

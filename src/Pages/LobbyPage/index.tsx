import { Container } from '@mui/material'
import { NodotsAppBar } from '../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'
import { Loading } from '../../Components/utils/Loading'

const LobbyPage = () => {
  const { state, dispatch } = usePlayerContext()
  const { player } = state
  switch (player?.kind) {
    case 'initializing':
      return <Loading message="Lobby Page Initializing Player" />
    case 'playing':
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

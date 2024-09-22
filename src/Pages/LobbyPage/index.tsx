import { Container } from '@mui/material'
import { NodotsAppBar } from '../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'
import { Loading } from '../../Components/utils/Loading'

const LobbyPage = () => {
  const { state, dispatch } = usePlayerContext()
  console.log('[LobbyPage] state.player:', state.player)
  return !state.player ? (
    <Loading message="Lobby Page Waiting for Player" />
  ) : (
    <>
      <NodotsAppBar />
      <Container>
        <SeekingGameToggle />
        <Friends />
      </Container>
    </>
  )
}

export default LobbyPage

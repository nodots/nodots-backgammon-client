import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'

export const LobbyPage = () => {
  const { state, dispatch } = usePlayerContext()
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

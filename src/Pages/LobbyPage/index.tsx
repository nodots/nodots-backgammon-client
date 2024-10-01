import { Container } from '@mui/material'
import { NodotsAppBar } from '../../Components/NodotsAppBar'
import Friends from './ChildComponents/Opponents'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../Contexts/Player/usePlayerContext'
import { Loading } from '../../Components/utils/Loading'
import PollForGame from './ChildComponents/PollForGame'

const LobbyPage = () => {
  return (
    <>
      {/* <PollForGame /> */}
      <NodotsAppBar />
      <Container>
        {/* <SeekingGameToggle /> */}
        {/* <Friends /> */}
      </Container>
    </>
  )
}

export default LobbyPage

import { Container } from '@mui/material'
import { NodotsAppBar } from '../../Components/NodotsAppBar'
import Opponents from './ChildComponents/Opponents'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { Loading } from '../../Components/utils/Loading'
import PollForGame from './ChildComponents/PollForGame'
import { useGameContext } from '../../Contexts/Game/GameContext'
import { useEffect } from 'react'

const LobbyPage = () => {
  const { game, player } = useGameContext()

  useEffect(() => {
    console.log('[LobbyPage] game:', game)
    console.log('[LobbyPage] player:', player)
  }, [game])

  return (
    <>
      <NodotsAppBar />
      <Container>
        <SeekingGameToggle />
        <Opponents />
      </Container>
      <PollForGame />
    </>
  )
}

export default LobbyPage

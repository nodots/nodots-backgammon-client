import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'
import { useEffect, useState } from 'react'
import { NodotsPlayerActive } from '../../../../nodots_modules/backgammon-types'

export const LobbyPage = () => {
  const { state, dispatch } = usePlayerContext()
  const [activePlayer, setActivePlayer] = useState<NodotsPlayerActive>(
    state.player
  )
  useEffect(() => {
    !activePlayer && setActivePlayer(state.player)
  }, [dispatch])

  return (
    <>
      <NodotsAppBar player={activePlayer} />
      <Container>
        <SeekingGameToggle />
        <Friends player={state.player} />
      </Container>
    </>
  )
}

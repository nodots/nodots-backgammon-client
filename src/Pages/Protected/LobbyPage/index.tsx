import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import Friends from './ChildComponents/Friends'
import { SeekingGameToggle } from './ChildComponents/SeekingGameToggle'
import {
  playerContext,
  PlayerContextType,
} from '../../../Contexts/Player/playerContext'
import { useContext, useReducer } from 'react'
import { playerReducer } from '../../../Contexts/Player/playerReducer'
import { useAuth0 } from '@auth0/auth0-react'

export const LobbyPage = () => {
  const playerCtx = useContext(playerContext)

  return <>{JSON.stringify(playerCtx?.player)}</>

  // return (
  //   <Container>
  //     <NodotsAppBar />

  //     <h1>Lobby</h1>
  //     <SeekingGameToggle />
  //     <Friends />
  //   </Container>
  // )
}

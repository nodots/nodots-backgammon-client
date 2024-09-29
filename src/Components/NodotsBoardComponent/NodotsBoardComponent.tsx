import { Paper } from '@mui/material'
import NodotsBoardHalf from './NodotsBoardHalf'
import { NodotsBarComponent } from './NodotsBarComponent/NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'
import { useGameContext } from '../../Contexts/Game/useGameContext'
import { Loading } from '../utils/Loading'

export const NodotsBoardComponent = () => {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  switch (game.kind) {
    case 'initializing':
      return <Loading message="NodotsBoardComponent loading game" />
    default:
      return (
        <Paper id="Board">
          <NodotsBoardHalf longitude="west" />
          <NodotsBarComponent />
          <NodotsBoardHalf longitude="east" />
          <NodotsOffComponent />
        </Paper>
      )
  }
}

import { Paper } from '@mui/material'
import NodotsBoardHalf from './NodotsBoardHalf'
import { NodotsBarComponent } from './NodotsBarComponent/NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'
import { useGameContext } from '../../Contexts/Game/useGameContext'
import { Loading } from '../utils/Loading'

export const NodotsBoardComponent = () => {
  const { game } = useGameContext()
  return game ? (
    <Paper id="BoardContainer">
      <NodotsBoardHalf longitude="west" />
      <NodotsBarComponent />
      <NodotsBoardHalf longitude="east" />
      <NodotsOffComponent />
    </Paper>
  ) : (
    <Loading message="NodotsBoardComponent loading game" />
  )
}

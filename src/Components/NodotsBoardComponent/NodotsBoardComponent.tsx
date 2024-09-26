import { Paper } from '@mui/material'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types/index'

import { NodotsBoard } from './NodotsBoard'
import NodotsBoardHalf from './NodotsBoardHalf'
import { NodotsBarComponent } from './NodotsBarComponent/NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'

export const NodotsBoardComponent = () => {
  const Board = (
    <Paper elevation={1} id="BoardContainer">
      <NodotsBoardHalf longitude="west" />
      <NodotsBarComponent />
      <NodotsBoardHalf longitude="east" />
      <NodotsOffComponent />
    </Paper>
  )

  return Board
}

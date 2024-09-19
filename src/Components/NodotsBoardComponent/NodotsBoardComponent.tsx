import { Paper } from '@mui/material'
import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameReady,
  GameRollingForStart,
  NodotsColor,
  NodotsGame,
  NodotsGameActive,
  Player,
  PlayerPlaying,
} from '../../../nodots_modules/backgammon-types/index'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { NodotsBoard } from './NodotsBoard'
import NodotsBoardHalf from './NodotsBoardHalf'
import { NodotsBarComponent } from './NodotsBarComponent/NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent/NodotsOffComponent'

interface Props {
  game: NodotsGame
  player: Player
}

export const NodotsBoardComponent = ({ game, player }: Props) => {
  const Board = (
    <Paper elevation={1} id="BoardContainer">
      <NodotsBoardHalf game={game} player={player} longitude="west" />
      <NodotsBarComponent game={game} player={player} />
      <NodotsBoardHalf game={game} player={player} longitude="east" />
      <NodotsOffComponent game={game} player={player} />
    </Paper>
  )

  return Board
}

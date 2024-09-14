import { Container } from '@mui/material'
import { NodotsAppBar } from '../../../Components/NodotsAppBar'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import NodotsBoardComponent from '../../../Components/NodotsBoardComponent'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}

const GamePage = ({ game, player }: Props) => {
  console.log('[GamePage] game:', game)
  console.log('[GamePage] player:', player)
  return <NodotsBoardComponent game={game} player={player} />
}

export default GamePage

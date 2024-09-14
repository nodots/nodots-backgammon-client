import {
  GamePlayingMoving,
  GamePlayingRolling,
  GameReady,
  GameRollingForStart,
  NodotsColor,
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types/index'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { NodotsBoard } from './NodotsBoard'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}

export const NodotsBoardComponent = ({ game, player }: Props) => {
  // const { game, getColorsByDirection } = useNodotsGame()
  console.log('[NodotsBoardComponent] game:', game)
  console.log('[NodotsBoardComponent] player:', player)
  return <NodotsBoard game={game} player={player} />
}

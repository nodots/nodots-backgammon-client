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
  switch (game.kind) {
    case 'game-ready':
      return <NodotsBoard game={game} player={player} />
    case 'game-rolling-for-start':
      return <div>Rolling for start</div>
    case 'game-playing-rolling':
      return <div>Rolling</div>
    case 'game-playing-moving':
      return <div>Moving</div>
  }
}

import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  PlayerPlaying,
  PlayerReady,
} from '../../../../nodots_modules/backgammon-types'
import NodotsPipCountComponent from '../NodotsPipCountComponent'
import { getCheckerComponents } from '../NodotsPointComponent'

interface Props {
  game: NodotsGame
  player: PlayerPlaying | PlayerReady
}

export const NodotsBarComponent = ({ game, player }: Props) => {
  const { board } = game
  const { bar } = board

  console.log('[NodotsBarComponent] bar:', bar)
  console.log('[NodotsBarComponent] game:', game)
  console.log('[NodotsBarComponent] player:', player)

  let direction: NodotsMoveDirection | undefined
  let color: NodotsColor | undefined

  switch (player.kind) {
    case 'player-playing':
    case 'player-ready':
      direction = player.direction
      color = player.color
      console.log('[NodotsBarComponent] direction:', direction)
      console.log('[NodotsBarComponent] color:', color)
      const clockwiseCheckers =
        direction === 'clockwise' ? bar.black.checkers : bar.white.checkers
      const counterclockwiseCheckers =
        direction === 'counterclockwise'
          ? bar.black.checkers
          : bar.white.checkers
      return (
        <div id="Bar">
          <NodotsPipCountComponent game={game} player={player} />
          <div className="checkerbox counterclockwise">
            {counterclockwiseCheckers.length}
          </div>
          <div className="checkerbox clockwise">{clockwiseCheckers.length}</div>
          <NodotsPipCountComponent game={game} player={player} />
        </div>
      )
  }
}

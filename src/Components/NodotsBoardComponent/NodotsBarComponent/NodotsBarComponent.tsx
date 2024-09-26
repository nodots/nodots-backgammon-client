import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
} from '../../../../nodots_modules/backgammon-types'
import NodotsPipCountComponent from '../NodotsPipCountComponent'
import { getCheckerComponents } from '../NodotsPointComponent'

interface Props {}

export const NodotsBarComponent = () => {
  console.log('[NodotsBarComponent] bar:', bar)
  console.log('[NodotsBarComponent] game:', game)
  console.log('[NodotsBarComponent] player:', player)

  let direction: NodotsMoveDirection | undefined
  let color: NodotsColor | undefined

  switch (player.kind) {
    case 'playing':
    case 'ready':
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

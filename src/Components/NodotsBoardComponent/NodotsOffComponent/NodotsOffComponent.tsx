import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  PlayerPlaying,
  PlayerReady,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  game: NodotsGame
  player: PlayerPlaying | PlayerReady
}

export const NodotsOffComponent = ({ game, player }: Props) => {
  const { board } = game
  const { off } = board

  let direction: NodotsMoveDirection | undefined
  let color: NodotsColor | undefined

  switch (player.kind) {
    case 'player-playing':
    case 'player-ready':
      direction = player.direction
      color = player.color
      const clockwiseCheckers =
        direction === 'clockwise' ? off.black.checkers : off.white.checkers
      const counterclockwiseCheckers =
        direction === 'counterclockwise'
          ? off.black.checkers
          : off.white.checkers
      return (
        <div id="Off">
          <div className="checkerbox counterclockwise">
            {counterclockwiseCheckers.length}
          </div>
          <div className="checkerbox clockwise">{clockwiseCheckers.length}</div>
        </div>
      )
  }
}

export default NodotsOffComponent

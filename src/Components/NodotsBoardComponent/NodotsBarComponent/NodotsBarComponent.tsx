import { NodotsGameStateReady } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import NodotsPipCountComponent from '../NodotsPipCountComponent'
import { getCheckerComponents } from '../NodotsPointComponent'

export const NodotsBarComponent = () => {
  const { game, getPlayerForDirection, getCheckersForDirection } =
    useNodotsGame()
  const _game = game as NodotsGameStateReady // FIXME.
  const clockwisePlayer = getPlayerForDirection('clockwise', _game.players)
  const counterclockwisePlayer = getPlayerForDirection(
    'counterclockwise',
    _game.players
  )
  const clockwiseCheckers = getCheckersForDirection(
    'clockwise',
    _game.players,
    _game.board
  )
  const counterclockwiseCheckers = getCheckersForDirection(
    'counterclockwise',
    _game.players,
    _game.board
  )
  return (
    <div id="Bar">
      <NodotsPipCountComponent player={counterclockwisePlayer} />
      <div className="checkerbox counterclockwise">
        {getCheckerComponents(_game, clockwiseCheckers, 'bar')}
      </div>
      <div className="checkerbox clockwise">
        {getCheckerComponents(_game, counterclockwiseCheckers, 'bar')}
      </div>
      <NodotsPipCountComponent player={clockwisePlayer} />
    </div>
  )
}

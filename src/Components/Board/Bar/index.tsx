import { observer } from 'mobx-react'
import { getCheckerComponents } from '../Point'
import RevertMove from '../RevertMove'
import {
  GameCompleted,
  GamePlaying,
  GameReady,
  GameRollingForStart,
} from '../../../stores/Game/Types'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../stores/Game/Stores/Player/helpers'
import { NodotsGameStore } from '../../../stores/Game/Store'

export interface Props {
  gameStore: NodotsGameStore
}

function Bar({ gameStore }: Props) {
  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      return <></>
    case 'game-ready':
    case 'game-playing':
    case 'game-completed':
      const gameState = gameStore.state as GamePlaying // FIXME
      const { board, players } = gameState

      const clockwisePlayer = getClockwisePlayer(players)
      const clockwiseColor = clockwisePlayer.color
      const clockwiseCheckers = board.bar[clockwiseColor].checkers
      const counterclockwisePlayer = getCounterclockwisePlayer(players)
      const counterclockwiseColor = counterclockwisePlayer.color
      const counterclockwiseCheckers = board.bar[counterclockwiseColor].checkers
      return (
        <div id="Bar">
          <div className="checkerbox counterclockwise">
            {getCheckerComponents(gameStore, clockwiseCheckers, 'bar')}
          </div>
          <div>
            <RevertMove gameStore={gameStore} />
          </div>
          <div className="checkerbox clockwise">
            {getCheckerComponents(gameStore, counterclockwiseCheckers, 'bar')}
          </div>
        </div>
      )
  }
}

export default observer(Bar)

import { observer } from 'mobx-react'
import { getCheckerComponents } from '../Point'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../stores/Game/Stores/Player/helpers'
import { NodotsGameStore } from '../../../stores/Game/Store'
import Cube from '../Cube'
import { GamePlaying_Moving } from '../../../stores/Game/Types'

export interface Props {
  gameStore: NodotsGameStore
}

function Off({ gameStore }: Props) {
  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      return <></>
    case 'game-ready':
    case 'game-playing-moving':
    case 'game-playing-rolling':
    case 'game-completed':
      const gameState = gameStore.state as GamePlaying_Moving // FIXME
      const { board, players } = gameState

      const clockwisePlayer = getClockwisePlayer(players)
      const clockwiseColor = clockwisePlayer.color
      const clockwiseCheckers = board.bar[clockwiseColor].checkers
      const counterclockwisePlayer = getCounterclockwisePlayer(players)
      const counterclockwiseColor = counterclockwisePlayer.color
      const counterclockwiseCheckers = board.bar[counterclockwiseColor].checkers
      return (
        <div id="Off">
          <div className="checkerbox counterclockwise">
            {getCheckerComponents(gameStore, clockwiseCheckers, 'off')}
          </div>
          <div>
            <Cube gameStore={gameStore} />
          </div>
          <div className="checkerbox clockwise">
            {getCheckerComponents(gameStore, counterclockwiseCheckers, 'off')}
          </div>
        </div>
      )
  }
}

export default observer(Off)

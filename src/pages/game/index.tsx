import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import BoardComponent from '../../components/Board'
import GameNotifications from '../../components/Nofitications/Game'
import DebugNotifications from '../../components/Nofitications/Debug'
import NodotsGameStore from '../../GameStore'
import { generateId, rollingForStart } from '../../GameStore/types'
import { Players } from '../../GameStore/types/Player'
import { Player } from '../../GameStore/types/Player'

import Quadrant from '../../components/Quadrant'
import Bar from '../../components/Bar'
import Off from '../../components/Off'

const whitePlayer: Player = {
  id: generateId(),
  color: 'white',
  username: 'White Stripes',
  moveDirection: 'counterclockwise',
  pipCount: 167,
  automation: {
    roll: true,
    move: false,
  },
  dice: [
    { color: 'white', order: 0, value: 1 },
    { color: 'white', order: 1, value: 1 },
  ],
}

const blackPlayer: Player = {
  id: generateId(),
  color: 'black',
  username: 'Black Messiah',
  moveDirection: 'clockwise',
  pipCount: 167,
  automation: {
    roll: true,
    move: false,
  },
  dice: [
    { color: 'black', order: 0, value: 1 },
    { color: 'black', order: 1, value: 1 },
  ],
}

interface NodotsBoardDisplay {
  quadrants: [
    typeof Quadrant,
    typeof Quadrant,
    typeof Quadrant,
    typeof Quadrant
  ]
  bar: typeof Bar
  off: typeof Off
}

class GamePage extends Component {
  private store: NodotsGameStore

  constructor(props: {} | Readonly<{}>) {
    super(props)
    // TODO: Think carefully about this transition from the model to the presentation.
    // Quadrants only exist in presentation for example. We also want to be able to
    // have both players play the same color in the same direction.
    // See initializing method in GameStore/types/ for other side of this convo
    this.store = new NodotsGameStore({ white: whitePlayer, black: blackPlayer })
    switch (this.store.state.kind) {
      case 'initializing':
        this.store.state = rollingForStart(this.store.state)
        break
      case 'confirming':
      case 'moving':
      case 'rolling':
      case 'rolling-for-start':
        break
    }
  }

  render() {
    return (
      <Paper id="GameContainer">
        {/* <GameNotifications store={this.store} /> */}
        <BoardComponent store={this.store} state={this.store.state} />
        <DebugNotifications store={this.store} />
      </Paper>
    )
  }
}

export default observer(GamePage)

import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import NodotsGameStore from '../../GameStore'
import {
  Initializing,
  generateId,
  rollingForStart,
} from '../../GameStore/types'
import { InitializingPlayer, Player } from '../../GameStore/types/Player'
import BoardComponent from '../../components/Board'
import GameNotifications from '../../components/Nofitications/Game'
import Bar from '../../components/Bar'
import Off from '../../components/Off'
import Quadrant from '../../components/Quadrant'

const whitePlayer: InitializingPlayer = {
  kind: 'initializing',
  id: generateId(),
  color: 'white',
  username: 'White Stripes',
  direction: 'counterclockwise',
  pipCount: 167,
  automation: {
    roll: true,
    move: false,
  },
  dice: [
    { kind: 'inactive', color: 'white', order: 0, value: 1 },
    { kind: 'inactive', color: 'white', order: 1, value: 1 },
  ],
}

const blackPlayer: InitializingPlayer = {
  kind: 'initializing',
  id: generateId(),
  color: 'black',
  username: 'Black Messiah',
  direction: 'clockwise',
  pipCount: 167,
  automation: {
    roll: true,
    move: false,
  },
  dice: [
    { kind: 'inactive', color: 'black', order: 0, value: 1 },
    { kind: 'inactive', color: 'black', order: 1, value: 1 },
  ],
}

class GamePage extends Component {
  private store: NodotsGameStore

  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.store = new NodotsGameStore({ white: whitePlayer, black: blackPlayer })
    switch (this.store.state.kind) {
      case 'game-initializing':
        this.store.state = rollingForStart(this.store.state)
        break
      case 'game-confirming':
      case 'game-moving':
      case 'game-rolling':
      case 'game-rolling-for-start':
        break
    }
  }

  render() {
    return (
      <Paper id="GameContainer">
        <GameNotifications store={this.store} />
        <BoardComponent store={this.store} state={this.store.state} />
        {/* <DebugNotifications store={this.store} /> */}
      </Paper>
    )
  }
}

export default observer(GamePage)

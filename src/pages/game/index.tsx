import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import BoardComponent from '../../components/Board'
import GameNotifications from '../../components/Nofitications/Game'
import DebugNotifications from '../../components/Nofitications/Debug'
import NodotsGameStore from '../../game'
import {
  Players,
  blackBoard,
  buildCheckersForColor,
  generateId,
  getCheckersForColor,
  rollingForStart,
  whiteBoard,
} from '../../game/Types'
import { Player } from '../../game/player'

class GamePage extends Component {
  private store: NodotsGameStore

  constructor(props: {} | Readonly<{}>) {
    super(props)
    const white: Player = {
      id: generateId(),
      color: 'white',
      username: 'White Stripes',
      board: whiteBoard,
      checkers: buildCheckersForColor('white'),
      dice: [
        { color: 'white', order: 0, value: 1 },
        { color: 'white', order: 1, value: 1 },
      ],
      moveDirection: 'counterclockwise',
      pipCount: 167,
      automation: {
        roll: true,
        move: false,
      },
    }
    const black: Player = {
      id: generateId(),
      color: 'black',
      username: 'Black Messiah',
      board: blackBoard,
      checkers: buildCheckersForColor('black'),
      dice: [
        { color: 'black', order: 0, value: 1 },
        { color: 'black', order: 1, value: 1 },
      ],
      moveDirection: 'clockwise',
      pipCount: 167,
      automation: {
        roll: true,
        move: false,
      },
    }
    const players: Players = {
      white,
      black,
    }

    console.log(players.black.checkers)

    this.store = new NodotsGameStore(players)

    switch (this.store.state.kind) {
      case 'initializing':
        this.store.state = rollingForStart(this.store.state)
        break
      case 'confirming':
      case 'moving':
      case 'ready':
      case 'rolling':
      case 'rolling-for-start':
        break
    }
  }

  render() {
    return (
      <Paper id="GameContainer">
        <GameNotifications store={this.store} />
        <BoardComponent state={this.store.state} />
        <DebugNotifications store={this.store} />
      </Paper>
    )
  }
}

export default observer(GamePage)

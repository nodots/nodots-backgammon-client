import { observer } from 'mobx-react'
import BoardComponent from '../../components/Board'
import { Players } from '../../game/Types'
import { Paper } from '@mui/material'
import GameNotifications from '../../components/GameNotifications'
import { Component } from 'react'
import { generateId } from '../../game/Types'
import { Player } from '../../game/player'
import NodotsGameStore from '../../game'

class GamePage extends Component {
  private store: NodotsGameStore

  whitePlayer: Player = {
    id: generateId(),
    color: 'white',
    moveDirection: 'counterclockwise',
    username: 'White Stripes',
    dice: [
      { color: 'white', value: 1, order: 0 },
      { color: 'white', value: 1, order: 1 },
    ],
    pipCount: 167,
    automation: {
      move: false,
      roll: false,
    },
  }

  blackPlayer: Player = {
    id: generateId(),
    color: 'black',
    moveDirection: 'clockwise',
    username: 'Black Power',
    dice: [
      { color: 'white', value: 1, order: 0 },
      { color: 'white', value: 1, order: 1 },
    ],
    pipCount: 167,
    automation: {
      move: false,
      roll: false,
    },
  }

  players: Players = {
    white: this.whitePlayer,
    black: this.blackPlayer,
  }

  constructor(props: {} | Readonly<{}>) {
    super(props)
    const white: Player = {
      id: generateId(),
      color: 'white',
      username: 'White Stripes',
      dice: [
        { color: 'white', order: 0, value: 1 },
        { color: 'white', order: 1, value: 1 },
      ],
      moveDirection: 'clockwise',
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
      dice: [
        { color: 'black', order: 0, value: 1 },
        { color: 'black', order: 1, value: 1 },
      ],
      moveDirection: 'counterclockwise',
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
    this.store = new NodotsGameStore(players)
  }

  render() {
    return (
      <Paper id="GameContainer">
        <GameNotifications store={this.store} />
        <BoardComponent store={this.store} />
      </Paper>
    )
  }
}

export default observer(GamePage)

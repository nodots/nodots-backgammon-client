import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import { generateId } from '../../stores/Game/Types'
import Board from '../../components/Board'
import RootStore from '../../stores'
import {
  PlayerInitializing,
  NodotsPlayers,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'

const whitePlayer: PlayerInitializing = {
  kind: 'player-initializing',
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

const blackPlayer: PlayerInitializing = {
  kind: 'player-initializing',
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

const players: NodotsPlayers = { white: whitePlayer, black: blackPlayer }

class GamePage extends Component {
  private rootStore: RootStore

  constructor(props: {} | Readonly<{}>) {
    super(props)
    console.log('[GamePage] constructor')
    this.rootStore = new RootStore(players)
    console.log(this.rootStore)
  }

  render() {
    switch (this.rootStore.gameStore.state.kind) {
      case 'game-initializing':
      case 'game-rolling-for-start':
        return <></>
      case 'game-playing':
      case 'game-ready':
      case 'game-completed':
        console.log(this.rootStore.gameStore.state)

        return (
          <>
            <Paper id="GameContainer">
              <Board gameStore={this.rootStore.gameStore} />
              <HUD store={this.rootStore} />
            </Paper>
            <footer>
              <div>
                Copyright &copy; {new Date().getFullYear()} Nodots Backgammon.
                All Rights Reserved.
              </div>
              <div>
                <a href="mailto:backgammon@nodots.com">backgammon@nodots.com</a>
              </div>
            </footer>
          </>
        )
      default:
        return <></>
    }
  }
}

export default observer(GamePage)

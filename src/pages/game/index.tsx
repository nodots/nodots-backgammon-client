import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import { GameInitializing, generateId } from '../../stores/Game/Types'
import Board from '../../components/Board'
import RootStore from '../../stores/RootStore'
import {
  PlayerInitializing,
  NodotsPlayers,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'
import chalk from 'chalk'

const whitePlayer: PlayerInitializing = {
  kind: 'player-initializing',
  color: 'white',
  username: 'White Stripes',
  direction: 'counterclockwise',
  automation: {
    roll: true,
    move: false,
  },
}

const blackPlayer: PlayerInitializing = {
  kind: 'player-initializing',
  color: 'black',
  username: 'Black Messiah',
  direction: 'clockwise',
  automation: {
    roll: true,
    move: false,
  },
}

const players: NodotsPlayers = { white: whitePlayer, black: blackPlayer }

class GamePage extends Component {
  private rootStore: RootStore

  constructor(props: {} | Readonly<{}>) {
    super(props)
    console.log('[GamePage] constructor')
    this.rootStore = new RootStore(players)
    this.rootStore.gameStore.rollingForStart(
      this.rootStore.gameStore.state as GameInitializing,
      this.rootStore.gameStore.state.players
    ) // FIXME
    console.log(
      chalk.bgBlue('[GamePage constructor]  rootStore:'),
      this.rootStore
    )
    console.log(chalk.underline('[GamePage constructor] childStores'))
    console.log(
      chalk.bgGrey('\t[GamePage] constructor gameStore:'),
      this.rootStore.gameStore
    )
    console.log(
      chalk.bgGrey('\t[GamePage] constructor playerStores:'),
      this.rootStore.gameStore.playerStores
    )
  }

  render() {
    switch (this.rootStore.gameStore.state.kind) {
      case 'game-initializing':
      case 'game-rolling-for-start':
        return <></>
      case 'game-playing-rolling':
      case 'game-playing-moving':
      case 'game-ready':
      case 'game-completed':
        // console.log(this.rootStore.gameStore.state)

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

import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import NodotsGameStore from '../../GameStore'
import { generateId, rollingForStart } from '../../GameStore/types'
import { InitializingPlayer } from '../../GameStore/types/Player'
import BoardComponent from '../../components/Board'
import HUDComponent from '../../components/HUD'

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

  saveGame = () => {
    const gameData = JSON.stringify(this.store)
    const blob = new Blob([gameData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'nodots-backgammon-game.json'
    link.href = url
    link.click()
  }

  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.store = new NodotsGameStore({ white: whitePlayer, black: blackPlayer })
    switch (this.store.state.kind) {
      case 'game-initializing':
        this.store.state = rollingForStart(this.store.state)
        break
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-rolling':
      case 'game-rolling-for-start':
        break
    }
  }

  render() {
    return (
      <>
        {/* <div id="GameControls">
          <Button onClick={this.saveGame}>Save Game</Button>
        </div> */}
        <Paper id="GameContainer">
          {/* <GameNotifications store={this.store} /> */}
          <BoardComponent store={this.store} state={this.store.state} />
          <HUDComponent store={this.store} />
        </Paper>
        <footer>
          <div>
            Copyright &copy; {new Date().getFullYear()} Nodots Backgammon. All
            Rights Reserved.
          </div>
          <div>
            <a href="mailto:backgammon@nodots.com">backgammon@nodots.com</a>
          </div>
        </footer>
      </>
    )
  }
}

export default observer(GamePage)

import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import { generateId } from '../../stores/Types'
import { NodotsPlayers, PlayerInitializing } from '../../stores/Player/Types'
import BoardComponent from '../../components/Board'
import HUDComponent from '../../components/HUD'
import { NodotsGame } from '../../stores/Game'

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
  private store: NodotsGame

  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.store = new NodotsGame(players)
  }

  render() {
    return (
      <>
        {/* <div id="GameControls">
          <Button onClick={this.saveGame}>Save Game</Button>
        </div> */}
        <Paper id="GameContainer">
          {/* <GameNotifications store={this.store} /> */}
          <BoardComponent store={this.store} />
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

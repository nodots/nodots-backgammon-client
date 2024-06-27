import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import Board from '../../components/Board'
import RootStore from '../../stores/RootStore'
import {
  PlayerInitializing,
  NodotsPlayers,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'
import chalk from 'chalk'
import { NodotsGameStore } from '../../stores/Game/Store'
import React from 'react'

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
  username: 'Black Sabbath',
  direction: 'clockwise',
  automation: {
    roll: true,
    move: false,
  },
}

const players: NodotsPlayers = { white: whitePlayer, black: blackPlayer }

interface Props {
  rootStore: RootStore
}
function GamePage({ rootStore }: Props) {
  const [gameStore] = React.useState<NodotsGameStore>(
    new NodotsGameStore(players)
  )

  switch (gameStore.state.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      return <></>
    case 'game-playing-rolling':
    case 'game-playing-moving':
    case 'game-ready':
    case 'game-completed':
      console.log(gameStore.state)

      return (
        <>
          <Paper id="GameContainer">
            <Board gameStore={gameStore} />
            <HUD store={rootStore} />
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
    default:
      return <></>
  }
}

export default observer(GamePage)

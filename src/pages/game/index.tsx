import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import Board from '../../components/Board'
import RootStore, { generateId, useStore } from '../../stores/RootStore'
import {
  PlayerInitializing,
  NodotsPlayersInitializing,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'
import { NodotsGameState } from '../../stores/Game/Types'
import chalk from 'chalk'

const whiteExternalId = generateId()
const whiteEmail = `white-${whiteExternalId}@nodots.com`

const white: PlayerInitializing = {
  id: generateId(),
  kind: 'player-initializing',
  externalId: whiteExternalId,
  locale: 'en',
  email: whiteEmail,
  pipCount: 167,
  preferences: {
    username: "White Stripes's Revenge",
    color: 'white',
    direction: 'clockwise',
    automation: {
      roll: false,
      move: false,
    },
  },
}

const blackExternalId = generateId()
const blackEmail = `black-${blackExternalId}@nodots.com`

const black: PlayerInitializing = {
  id: generateId(),
  kind: 'player-initializing',
  externalId: blackExternalId,
  email: blackEmail,
  locale: 'en',
  pipCount: 167,
  preferences: {
    username: "Black Messiah's Revenge",
    color: 'black',
    direction: 'counterclockwise',
    automation: {
      roll: false,
      move: false,
    },
  },
}

const players: NodotsPlayersInitializing = {
  kind: 'players-initializing',
  white,
  black,
}

const content = (gameState: NodotsGameState) => {
  return (
    <>
      <Paper id="GameContainer">
        {gameState.kind}
        <Board />
        <HUD />
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

const storeHasGame = (store: RootStore) => (store.gameStore ? true : false)

function GamePage() {
  const store = useStore()

  if (!storeHasGame(store)) {
    console.log(
      chalk.green(
        '2. [Pages: Game] calling store.buildGameStore with players:'
      ),
      players
    )
    store.buildGameStore(players)
  } else {
    console.log(
      chalk.green(
        '2. [Pages: Game] we have an existing game:',
        store.gameStore?.gameState
      ),
      players
    )
  }
  return <>GamePage</>
  // const gameStore = store.buildGameStore(players)
  // console.log(
  //   chalk.green("11. [Pages: Game] here's our gameStore!:"),
  //   gameStore
  // )
  // switch (gameStore.gameState)
  // return content(gameStore.gameState)
}

export default observer(GamePage)

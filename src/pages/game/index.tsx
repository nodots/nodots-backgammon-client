import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import Board from '../../components/Board'
import RootStore, { useStore } from '../../stores/RootStore'
import {
  PlayerInitializing,
  NodotsPlayers,
  NodotsPlayersInitializing,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'
import chalk from 'chalk'
import { NodotsGameStore } from '../../stores/Game/Store'
import { generateId } from '../../stores/Game/Types'

const white: PlayerInitializing = {
  id: generateId(),
  kind: 'player-initializing',
  color: 'white',
  username: "White Stripes' Revenge",
  automation: {
    move: false,
    roll: false,
  },
  direction: 'clockwise',
  pipCount: 167,
}

const black: PlayerInitializing = {
  id: generateId(),
  kind: 'player-initializing',
  color: 'black',
  username: "Black Prometheus' Revenge",
  automation: {
    move: false,
    roll: false,
  },
  direction: 'clockwise',
  pipCount: 167,
}

const players: NodotsPlayersInitializing = {
  white,
  black,
}

function GamePage() {
  const { gameStore } = useStore()

  const gameState = gameStore.gameState
  switch (gameState.kind) {
    case 'game-initialized':
      gameStore.rollingForStart(gameState, players)
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
    case 'game-rolling-for-start':
      return <>game-rolling-for-start</>
    case 'game-initializing':
      return <>game-initializing</>
    case 'game-playing-moving':
    case 'game-playing-rolling':
    case 'game-completed':
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
}

export default observer(GamePage)

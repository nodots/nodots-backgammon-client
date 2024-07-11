import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { Component } from 'react'
import Board from '../../components/Board'
import RootStore, { useStore } from '../../stores/RootStore'
import {
  PlayerInitializing,
  INodotsPlayers,
  NodotsPlayersInitializing,
} from '../../stores/Game/Stores/Player/Types'
import HUD from '../../components/HUD'
import chalk from 'chalk'
import { NodotsGameStore } from '../../stores/Game/Store'
import { generateId } from '../../stores/RootStore'

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
  return <>GamePage</>
}

export default observer(GamePage)

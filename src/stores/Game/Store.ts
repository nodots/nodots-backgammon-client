import chalk from 'chalk'
import { action, makeAutoObservable } from 'mobx'
import { NodotsPlayers, PlayerRolling } from './Stores/Player/Types'
import {
  GameInitializing,
  GamePlaying_Rolling,
  NodotsGameState,
  initializing,
  rollingForStart,
} from './Types'
import { NodotsPlayStore } from './Stores/Play/Store'
import { NodotsPlayerStore } from './Stores/Player/Store'
import { rolling } from './Stores/Player/Types'

export class NodotsGameStore {
  state: NodotsGameState
  playStore: NodotsPlayStore | undefined
  playerStores: {
    black: NodotsPlayerStore
    white: NodotsPlayerStore
  }

  constructor(players: NodotsPlayers) {
    makeAutoObservable(this)
    this.state = initializing(players)
    console.log(chalk.underline('[Store: Game] state:'), this.state)
    this.playStore = undefined // No plays until first dice roll
    this.playerStores = {
      black: new NodotsPlayerStore(players.black),
      white: new NodotsPlayerStore(players.white),
    }
  }

  @action
  rollingForStart(gameState: GameInitializing, players: NodotsPlayers) {
    const newState = rollingForStart(gameState)
    console.log(
      chalk.redBright('[Store: Game] rollingForStart newState:'),
      newState
    )
    this.state = newState
  }

  @action
  rolling(gameState: GamePlaying_Rolling, playerState: PlayerRolling) {
    const updatedPlayer = rolling(playerState)
    console.log('[Store: Game] rolling updatedPlayer:', updatedPlayer)
    const dice = updatedPlayer.dice
    console.log('[Store: Game] rolling dice:', dice)
    // this.playStore = new NodotsPlayStore(playerState, roll)
  }
}
